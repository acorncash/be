package com.example.demo.service;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.Mission;
import com.example.demo.model.entity.Mission.MissionBuilder;
import com.example.demo.model.form.MissionFormRequest;
import com.example.demo.repository.MissionInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MissionService {
    private final MissionInterface missionRepository;

    public List<Mission> getMissionByMissionType(String type) {
        return missionRepository.findByMissionType(type);
    }

    public Optional<Mission> getMissionByMissionSeq(Long missionSeq) {
        return missionRepository.findById(missionSeq);
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
                    .delYN("N")
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
