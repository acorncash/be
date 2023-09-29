package com.example.demo.service;

import com.example.demo.DTO.DTO;
import com.example.demo.model.entity.Dotoli;
import com.example.demo.model.entity.User;
import com.example.demo.model.entity.Withdraw;
import com.example.demo.model.form.WithdrawFromRequest;
import com.example.demo.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class WithdrawService {
    private final MissionInterface missionRepository;
    private final UserInterface userRepository;
    private final DotoliInterface dotoliRepository;
    private final CaptureMissionInterface captureMissionRepository;
    private final WithdrawInterface withdrawRepository;

    public List<Withdraw> getWithdrawAll() {
        return withdrawRepository.findAll();
    }

    public Optional<Withdraw> getWithdrawByWithdrawSeq(Integer withdrawSeq) {
        return withdrawRepository.findById(withdrawSeq);
    }

    public DTO.Response addWithdraw(WithdrawFromRequest form, String ipAddress) {
        DTO.Response response = new DTO.Response();
        response.setStatus("Fail");
        try{
            Optional<User> userOptional = userRepository.findBySeqAndDelYn(form.getUserSeq(), "N");

            userOptional.ifPresent(user -> {
                if(!(user.getDotoli() >= form.getDotoli())){
                    throw new IllegalStateException("보유한 도토리를 확인해주세요.");
                }

                Withdraw.WithdrawBuilder builder = Withdraw.builder();

                Withdraw withdraw = builder
                        .userSeq(form.getUserSeq())
                        .dotoli(form.getDotoli())
                        .bankAccountNumber(form.getBankAccountNumber())
                        .bankAccountName(form.getBankAccountNumber())
                        .withdrawYn("N")
                        .build();

                withdraw.setSeq(withdrawRepository.save(withdraw).getSeq());
                System.out.println(withdraw.getSeq());

                Dotoli.DotoliBuilder builder2 = Dotoli.builder();

                Dotoli dotoli = builder2.userSeq(form.getUserSeq())
                        .withdrawSeq(withdraw.getSeq())
                        .missionTitle("출금 요청")
                        .missionDotoli(form.getDotoli())
                        .userDotoli(user.getDotoli())
                        .afterDotoli(user.getDotoli() - form.getDotoli())
                        .ipAddress(ipAddress)
                        .build();

                dotoliRepository.save(dotoli);

                user.setDotoli(dotoli.getAfterDotoli());

                userRepository.save(user);

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
}
