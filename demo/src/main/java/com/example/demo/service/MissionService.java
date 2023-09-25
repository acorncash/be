package com.example.demo.service;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.CaptureMission;
import com.example.demo.model.entity.CaptureMission.CaptureMissionBuilder;
import com.example.demo.model.entity.Mission;
import com.example.demo.model.entity.Mission.MissionBuilder;
import com.example.demo.model.entity.Dotoli;
import com.example.demo.model.entity.Dotoli.DotoliBuilder;
import com.example.demo.model.entity.User;
import com.example.demo.model.form.MissionFormRequest;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MissionService {
    private final MissionInterface missionRepository;
    private final UserInterface userRepository;
    private final DotoliInterface dotoliRepository;
    private final CaptureMissionInterface captureMissionRepository;

    public List<Mission> getMissionByMissionType(String type) {
        return missionRepository.findByMissionTypeAndDelYn(type, "N");
    }

    public Optional<Mission> getMissionByMissionSeq(Integer missionSeq) {
        return missionRepository.findBySeqAndDelYn(missionSeq, "N");
    }

    public DTO.Response addMission(MissionFormRequest form) {
        DTO.Response response = new DTO.Response();
        try{
            MissionBuilder builder = Mission.builder();

            Mission mission = builder.missionType(form.getMissionType())
                    .title(form.getTitle())
                    .description(form.getDescription())
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

    public DTO.Response answerMission(Integer missionSeq, Integer userSeq, String answer) {
        DTO.Response response = new DTO.Response();
        response.setStatus("Fail");
        try {
            Optional<Mission> missionOptional = missionRepository.findBySeqAndDelYn(missionSeq, "N");
            Optional<User> userOptional = userRepository.findBySeqAndDelYn(userSeq, "N");

            //이중으로 ifPresent를 쓰고 있어서 혹시 이럴 때 코드 정리하는 법 알고 계시면 알려주시면 감사하겠습니다 :)
            /* 중첩이 많아진다면 이런식으로 풀어 쓰시면 될 겉 같은데 이중 중첩정도는 저렇게 쓰셔도 상관 없으실 것 같습니다.
            if (missionOptional.isPresent() && userOptional.isPresent()) {
                Mission mission = missionOptional.get();
                User user = userOptional.get();
                ....
            } */
            missionOptional.ifPresent(mission -> userOptional.ifPresent(user -> {
                if (Objects.equals(mission.getAnswer(), answer)) {
                    mission.setAttendCnt(+1);

                    missionRepository.save(mission);

                    DotoliBuilder builder = Dotoli.builder();

                    Dotoli dotoli = builder.userSeq(userSeq)
                            .missionSeq(mission.getSeq())
                            .missionTitle(mission.getTitle())
                            .missionDotoli(mission.getDotoli())
                            .userDotoli(user.getDotoli())
                            .afterDotoli(user.getDotoli() + mission.getDotoli())
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

    public DTO.Response captureMission(Integer missionSeq, Integer userSeq, String image) {
        DTO.Response response = new DTO.Response();
        response.setStatus("Fail");
        try {
            Optional<Mission> missionOptional = missionRepository.findBySeqAndDelYn(missionSeq, "N");
            Optional<CaptureMission> captureMissionOptional = captureMissionRepository.findByMissionSeqAndDelYn(missionSeq, "Y");

            if(captureMissionOptional.isPresent()){
                throw new IllegalStateException("이미 신청한 미션입니다.");
            }
            System.out.println("짜잔1");
            missionOptional.ifPresent(mission -> {
                System.out.println("짜잔2");
                CaptureMissionBuilder builder = CaptureMission.builder();

                CaptureMission captureMission = builder.userSeq(userSeq)
                        .missionSeq(missionSeq)
                        .image(image)
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
                mission.setDescription(form.getDescription());
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
}
