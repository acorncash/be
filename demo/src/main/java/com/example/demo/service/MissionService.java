package com.example.demo.service;

import com.example.demo.DTO.DTO;
import com.example.demo.model.dto.PageDTO;
import com.example.demo.model.entity.CaptureMission;
import com.example.demo.model.entity.CaptureMission.CaptureMissionBuilder;
import com.example.demo.model.entity.Dotoli;
import com.example.demo.model.entity.Dotoli.DotoliBuilder;
import com.example.demo.model.entity.Mission;
import com.example.demo.model.entity.Mission.MissionBuilder;
import com.example.demo.model.entity.User;
import com.example.demo.model.form.MissionAddFormRequest;
import com.example.demo.model.form.MissionFormRequest;
import com.example.demo.model.spec.MissionSpec;
import com.example.demo.repository.CaptureMissionInterface;
import com.example.demo.repository.DotoliInterface;
import com.example.demo.repository.MissionInterface;
import com.example.demo.repository.UserInterface;
import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.FileNotFoundException;
import java.util.*;

@Service
@RequiredArgsConstructor
public class MissionService {
    private final MissionInterface missionRepository;
    private final UserInterface userRepository;
    private final DotoliInterface dotoliRepository;
    private final CaptureMissionInterface captureMissionRepository;

    Base64.Encoder encoder = Base64.getEncoder();

    public List<Mission> getMissionAll() {
        return missionRepository.findAlLMissionByDelYn("N");
    }

    public Optional<Mission> getMissionByMissionSeq(Integer missionSeq) {
        return missionRepository.findBySeqAndDelYn(missionSeq, "N");
    }

    public void createMission(MissionAddFormRequest form) {
        Mission mission = Mission.builder()
                .missionType(form.getMissionType())
                .answer(form.getAnswer())
                .title(form.getTitle())
                .description(form.getDescription())
                .keyword(form.getKeyword())
                .price(form.getPrice())
                .mall(form.getMall())
                .url(form.getUrl())
                .dotoli(form.getDotoli())
                .attendCnt(form.getAttendCount())
                .limitCnt(form.getLimitCount())
                .startAt(form.getStartAt())
                .endAt(form.getEndAt())
                .snsType(form.getSnsType().getCode())
                .build();

        missionRepository.save(mission);
    }

    public void updateRows(Map<Long, MissionAddFormRequest> form) {
        form.keySet().forEach(k -> {
            Optional<Mission> missOptional = missionRepository.findById(k);
            if (missOptional.isPresent())
                update(missOptional.get(), form.get(k));
            else
                createMission(form.get(k));
        });
    }

    public void uploadImage(Long seq, MultipartFile image) {
        missionRepository.findById(seq).ifPresent(mission -> {
            String strImg = convertImageToBase64(image).orElse("");
            mission.setImage(strImg);

            missionRepository.save(mission);
        });
    }

    @Modifying(clearAutomatically = true)
    public void update(Mission mission, MissionAddFormRequest form) {
        try {
            mission.setTitle(form.getTitle());
            mission.setDescription(form.getDescription());
            mission.setKeyword(form.getKeyword());
            mission.setAnswer(form.getAnswer());
            mission.setPrice(form.getPrice());
            mission.setMall(form.getMall());
            mission.setDotoli(form.getDotoli());
            mission.setAttendCnt(form.getAttendCount());
            mission.setLimitCnt(form.getLimitCount());
            mission.setStartAt(form.getStartAt());
            mission.setEndAt(form.getEndAt());
            mission.setSnsType(form.getSnsType().getCode());

            missionRepository.save(mission);
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public PageDTO<Mission> getMissionByMissionType(String type, String searchType, String searchContent, Pageable pageable) {
       Specification<Mission> spec = MissionSpec.equalMissionType(type)
               .and(MissionSpec.equalDelYN("N"));

        if (searchContent != null && !searchContent.equals("")) {
            spec = spec.and(MissionSpec.search(searchType, searchContent));
        }

        Page<Mission> page = missionRepository.findAll(spec, pageable);
        
        return new PageDTO<Mission>(page);
    }

    public List<Mission> getMissionByMissionType(Integer userSeq, String type) {
        List<Mission> missionList = missionRepository.findByMissionType(type, "N");
        List<Mission> returnMissionList = new ArrayList<>();

        for (Mission mission : missionList) {
            System.out.println(userSeq);
            System.out.println(mission.getSeq());
            System.out.println(mission.getResetCnt());

//            Optional<Dotoli> dotoli = dotoliRepository.findTopByUserSeqAndMissionSeqOrderByCreatAtAsc(userSeq, mission.getSeq(), mission.getResetCnt());
            Optional<Dotoli> dotoli = dotoliRepository.findTopByUserSeqAndMissionSeqOrderByCreatAtAsc(userSeq, mission.getSeq());
            if(dotoli.isEmpty()){
                returnMissionList.add(mission);
            }
        }

        return returnMissionList;
    }

    public DTO.Response addMission(MissionFormRequest form) {
        DTO.Response response = new DTO.Response();
        try{
            MissionBuilder builder = Mission.builder();

            Mission mission = builder.missionType(form.getMissionType())
                    .title(form.getTitle())
                    .description(form.getDescription())
                    .keyword(form.getKeyword())
                    .price(form.getPrice())
                    .mall(form.getMall())
                    .image(form.getImage())
                    .dotoli(form.getDotoli())
                    .answer(form.getAnswer())
                    .attendCnt(0)
                    .delYn("N")
                    .build();

            missionRepository.save(mission);

            response.setStatus("Success");
            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus("Fail");
            response.setMessage(e.getMessage());

            return response;
        }
    }

    public DTO.Response answerMission(Integer missionSeq, Integer userSeq, String answer, String ipAddress) {
        DTO.Response response = new DTO.Response();
        response.setStatus("Fail");
        try {
            Optional<Mission> missionOptional = missionRepository.findBySeqAndDelYn(missionSeq, "N");
            Optional<User> userOptional = userRepository.findBySeqAndDelYn(userSeq, "N");
            List<Dotoli> dotoliList = dotoliRepository.findByMissionSeqAndIpAddress(missionSeq, ipAddress);

            if(!dotoliList.isEmpty()){
                throw new IllegalStateException("해당 IP로 이미 미션을 수행한 이력이 있습니다.");
            }

            //이중으로 ifPresent를 쓰고 있어서 혹시 이럴 때 코드 정리하는 법 알고 계시면 알려주시면 감사하겠습니다 :)
            /* 중첩이 많아진다면 이런식으로 풀어 쓰시면 될 겉 같은데 이중 중첩정도는 저렇게 쓰셔도 상관 없으실 것 같습니다.
            if (missionOptional.isPresent() && userOptional.isPresent()) {
                Mission mission = missionOptional.get();
                User user = userOptional.get();
                ....
            } */

            missionOptional.ifPresent(mission -> userOptional.ifPresent(user -> {
                if (Objects.equals(mission.getAnswer(), answer)) {
                    mission.setAttendCnt(mission.getAttendCnt()+1);

                    missionRepository.save(mission);

                    DotoliBuilder builder = Dotoli.builder();

                    Dotoli dotoli = builder.userSeq(userSeq)
                            .missionSeq(mission.getSeq())
                            .missionTitle(mission.getTitle())
                            .missionDotoli(mission.getDotoli())
                            .userDotoli(user.getDotoli())
                            .afterDotoli(user.getDotoli() + mission.getDotoli())
                            .ipAddress(ipAddress)
                            .build();

                    dotoliRepository.save(dotoli);

                    user.setDotoli(dotoli.getAfterDotoli());

                    userRepository.save(user);

                    response.setStatus("Success");
                }
                else {
                    throw new IllegalStateException("미션을 찾을 수 없습니다.");
                }
            }));

            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus("Fail");
            response.setMessage(e.getMessage());

            return response;
        }
    }

    public DTO.Response pressMission(Integer missionSeq, Integer userSeq, String ipAddress) {
        DTO.Response response = new DTO.Response();
        response.setStatus("Fail");
        try {
            Optional<Mission> missionOptional = missionRepository.findBySeqAndDelYn(missionSeq, "N");
            Optional<User> userOptional = userRepository.findBySeqAndDelYn(userSeq, "N");
            List<Dotoli> dotoliList = dotoliRepository.findByMissionSeqAndIpAddress(missionSeq, ipAddress);

            if(!dotoliList.isEmpty()){
                throw new IllegalStateException("해당 IP로 이미 미션을 수행한 이력이 있습니다.");
            }

            if (missionOptional.isPresent() && userOptional.isPresent()) {
                Mission mission = missionOptional.get();
                User user = userOptional.get();

                mission.setAttendCnt(+1);

                missionRepository.save(mission);

                DotoliBuilder builder = Dotoli.builder();

                    Dotoli dotoli = builder.userSeq(userSeq)
                            .missionSeq(mission.getSeq())
                            .missionTitle(mission.getTitle())
                            .missionDotoli(mission.getDotoli())
                            .userDotoli(user.getDotoli())
                            .afterDotoli(user.getDotoli() + mission.getDotoli())
                            .ipAddress(ipAddress)
                            .build();

                    dotoliRepository.save(dotoli);

                    user.setDotoli(dotoli.getAfterDotoli());

                    userRepository.save(user);

                    response.setStatus("Success");
            }

            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus("Fail");
            response.setMessage(e.getMessage());

            return response;
        }
    }

    public DTO.Response captureMission(Integer missionSeq, Integer userSeq, MultipartFile image) {
        DTO.Response response = new DTO.Response();
        response.setStatus("Fail");
        try {
            Optional<Mission> missionOptional = missionRepository.findBySeqAndDelYn(missionSeq, "N");
            Optional<CaptureMission> captureMissionOptional = captureMissionRepository.findByMissionSeqAndDelYn(missionSeq, "Y");
            Optional<String> imageOptional = convertImageToBase64(image);

            if(captureMissionOptional.isPresent()){
                throw new IllegalStateException("이미 신청한 미션입니다.");
            }

            if (imageOptional.isEmpty()) {
                throw new FileNotFoundException("이미지를 찾을 수 없습니다.");
            }

            missionOptional.ifPresent(mission -> {
                CaptureMissionBuilder builder = CaptureMission.builder();

                CaptureMission captureMission = builder.userSeq(userSeq)
                        .missionSeq(missionSeq)
                        .image(imageOptional.get())
                        .build();

                captureMissionRepository.save(captureMission);

                response.setStatus("Success");
            });

            return response;
        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus("Fail");
            response.setMessage(e.getMessage());

            return response;
        }
    }

    public void updateMission(Long id, MissionFormRequest form) {
        try {
            Optional<Mission> missionOptional = missionRepository.findById(id);

            missionOptional.ifPresent(mission -> {
                mission.setTitle(form.getTitle());
                mission.setAnswer(form.getAnswer());
                mission.setDescription(form.getDescription());
                mission.setKeyword(form.getKeyword());
                mission.setPrice(form.getPrice());
                mission.setMall(form.getMall());
                mission.setImage(form.getImage());
                mission.setDotoli(form.getDotoli());
                mission.setAnswer(form.getAnswer());

                missionRepository.save(mission);
            });
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void deleteById(Long id) {
        missionRepository.deleteById(id);
    }

    public void deleteByIds(List<Long> ids) {
        missionRepository.deleteAllById(ids);
    }

    private Optional<String> convertImageToBase64(MultipartFile image) {
        Optional<String> result;
        try {
            if (image != null) {
                byte[] photoEncode = encoder.encode(image.getBytes());
                result = Optional.of(new String(photoEncode, "UTF8"));
            } else
                result = Optional.empty();
        } catch (Exception e) {
            result = Optional.empty();
            System.out.println("이미지 변환중 오류가 발생했습니다.");
            e.printStackTrace();
        }

        return result;
    }
}
