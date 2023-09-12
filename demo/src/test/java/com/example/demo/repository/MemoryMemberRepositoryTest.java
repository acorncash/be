package com.example.demo.repository;

import com.example.demo.domain.Member;
import com.example.demo.service.MemberService;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.List;

public class MemoryMemberRepositoryTest {

    MemberService memberService;
    MemoryMemberRepository memberRepository;

    @BeforeEach
    public void beforeEach() {
        memberRepository = new MemoryMemberRepository();
        memberService = new MemberService(memberRepository);
    }

    @AfterEach
    public void afterEach(){
        memberRepository.clearStore();
    }

    @Test
    public void save() {
        Member member = new Member();
        member.setName("이동욱");

        memberRepository.save(member);

        Member result = memberRepository.findById(member.getId()).get();
        Assertions.assertThat(member).isEqualTo(result);
    }

    @Test
    public void findByName(){
        Member member1 = new Member();
        member1.setName("이동욱1");
        memberRepository.save(member1);

        Member member2 = new Member();
        member2.setName("이동욱2");
        memberRepository.save(member2);

        Member member3 = new Member();
        member3.setName("이동욱3");
        memberRepository.save(member3);

        Member result = memberRepository.findByName("이동욱1").get();
        System.out.print(result.getName());
    }

    @Test
    public void findAll(){
        Member member1 = new Member();
        member1.setName("이동욱1");
        memberRepository.save(member1);

        Member member2 = new Member();
        member2.setName("이동욱2");
        memberRepository.save(member2);

        Member member3 = new Member();
        member3.setName("이동욱3");
        memberRepository.save(member3);

        List<Member> result = memberRepository.findAll();

        for (Member member : result) {
            System.out.print(member.getName());
        }
        
    }
}
