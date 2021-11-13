package za.ac.nwu.ga.web.sb.controller;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import za.ac.nwu.ga.domain.dto.MemberInfoDto;
import za.ac.nwu.ga.domain.service.GeneralResponse;
import za.ac.nwu.ga.logic.flow.CreateMemberFlow;
import za.ac.nwu.ga.logic.flow.FetchMemberFlow;

import java.util.List;

@RestController
@RequestMapping("member-info")
public class MemberInfoController
{
    private final FetchMemberFlow fetchMemberFlow;
    private final CreateMemberFlow createMemberFlow;

    @Autowired
    public MemberInfoController(FetchMemberFlow fetchMemberFlow, CreateMemberFlow createMemberFlow) {
        this.fetchMemberFlow = fetchMemberFlow;
        this.createMemberFlow = createMemberFlow;
    }

    @GetMapping("/all")
    @ApiOperation(value = "Get all configured members",notes = "Returns a list of members")
    @ApiResponses(value = {
            @ApiResponse(code = 200, message = "Members retrieved",response = GeneralResponse.class),
            @ApiResponse(code = 400,message = "Bad Request", response = GeneralResponse.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = GeneralResponse.class)
    })
    public ResponseEntity<GeneralResponse<List<MemberInfoDto>>> all()
    {
        List<MemberInfoDto> members = fetchMemberFlow.getAllMembers();
        GeneralResponse<List<MemberInfoDto>> response = new GeneralResponse<>(true ,members);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    //Create a new account
    @PostMapping("")
    @ApiOperation(value = "Creates a new member.", notes = "Creates a new member in the DB.")
    @ApiResponses(value = {
            @ApiResponse(code = 201,message = "The member was created successfully", response = GeneralResponse.class),
            @ApiResponse(code = 400,message = "Bad Request", response = GeneralResponse.class),
            @ApiResponse(code = 500, message = "Internal Server Error", response = GeneralResponse.class)})
    public ResponseEntity<GeneralResponse<MemberInfoDto>> create(
            @ApiParam(value = "Request body to create a new member",required = true)
            @RequestBody MemberInfoDto memberInfo)
    {
        MemberInfoDto memberInfoResponses = createMemberFlow.create(memberInfo);
        GeneralResponse<MemberInfoDto> response = new GeneralResponse<>(true, memberInfoResponses);
        return new ResponseEntity<>(response, HttpStatus.CREATED);
    }




}
