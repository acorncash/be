package com.example.demo.service;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.Dotoli;
import com.example.demo.model.entity.Dotoli.DotoliBuilder;
import com.example.demo.model.entity.User;
import com.example.demo.repository.DotoliInterface;
import com.example.demo.repository.UserInterface;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DotoliService {
    private final DotoliInterface dotoliRepository;
    private final UserInterface userRepository;

    public List<Dotoli> getDotoliAll() {
        return dotoliRepository.findAll();
    }

    public Optional<Dotoli> getDotoli(Integer dotoliSeq) {
        return dotoliRepository.findById(Long.valueOf(dotoliSeq));
    }

    public DTO.Response insertAttendanceCheck(Integer userSeq, String ipAddress) {
        DTO.Response response = new DTO.Response();
        response.setStatus("Fail");

        try {
            Optional<Integer> attendanceCount = dotoliRepository.getCountOfAttendanceCheck(userSeq);
            System.out.print(attendanceCount);
            if (attendanceCount.get() == 0) {
                System.out.print(attendanceCount);
                Optional<User> userOptional = userRepository.findBySeqAndDelYn(userSeq, "N");
                User user = userOptional.get();

                DotoliBuilder builder = Dotoli.builder();

                Dotoli dotoli = builder.userSeq(userSeq)
                        .missionTitle("출석 체크 보상")
                        .missionDotoli(1)
                        .userDotoli(user.getDotoli())
                        .afterDotoli(user.getDotoli() + 1)
                        .ipAddress(ipAddress)
                        .build();

                dotoliRepository.save(dotoli);

                user.setDotoli(dotoli.getAfterDotoli());
                userRepository.save(user);

                response.setStatus("Success");
            } else {
                throw new IllegalStateException("오늘 출석체크 보상을 받았습니다.");
            }
            return response;
        } catch (Exception e) {
            response.setStatus("Fail");
            response.setMessage(e.getMessage());

            return response;
        }
    }

    public DTO.Response updateKakaoGiftUser(Integer userSeq, Integer price, String ipAddress) {
        DTO.Response response = new DTO.Response();
        response.setStatus("Fail");

        try {
                Optional<User> userOptional = userRepository.findBySeqAndDelYn(userSeq, "N");
                User user = userOptional.get();

                DotoliBuilder builder = Dotoli.builder();

                Dotoli dotoli = builder.userSeq(userSeq)
                        .missionTitle("기프티콘 결제")
                        .missionDotoli(price)
                        .userDotoli(user.getDotoli())
                        .afterDotoli(user.getDotoli() - price)
                        .ipAddress(ipAddress)
                        .build();

                dotoliRepository.save(dotoli);

                user.setDotoli(dotoli.getAfterDotoli());
                userRepository.save(user);

                response.setStatus("Success");
            return response;
        } catch (Exception e) {
            response.setStatus("Fail");
            response.setMessage(e.getMessage());

            return response;
        }
    }
}
