import Job from "../models/jobs"
import { getJobs, newJob } from "./jobsController";

const mockJob = {
    _id: "636ad8d88242262f5d0d85cc",
    title: "Node Developer",
    description:"efdgssddhbf fdbfss gsdadgv",
    email: "developer@gmail.com",
    address: "24245244cdvd",
    company:"gsddfgd",
    industry:[],
    positions:2,
    salary:3245234,
    user:"434grgtrhbe543ftg",
    postingDate:"2023-01-08T22:31:52.441Z"
};

const mockRequest = () => {
    return { 
        body:{},
        query:{},
        params:{},
        user:{}
    }
}

const mockResponse = () => {
    return {
        status:jest.fn().mockReturnThis(),
        json:jest.fn().mockReturnThis()
    }
}
afterEach(()=>{
    //restore the spy created with spyOn
    jest.restoreAllMocks();
});

describe("Jobs Controller",()=>{
    describe("Get All Jobs",()=>{
        it('should get all jobs',async()=>{
            jest.spyOn(Job,'find').mockImplementationOnce(()=>({
                limit: () => ({
                    skip:jest.fn().mockResolvedValueOnce([mockJob])
                })
            }))
            const mockReq = mockRequest();
            const mockRes = mockResponse();
            await getJobs(mockReq,mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                jobs: [mockJob]
            });
        })
    })

    describe("create New Job",()=>{
        it('should create a new job',async()=>{
            jest.spyOn(Job,'create').mockResolvedValueOnce(mockJob)
            const mockReq = mockRequest().body = {
                body:{
                    title: "Node Developer",
                    description:"efdgssddhbf fdbfss gsdadgv",
                    email: "developer@gmail.com",
                    address: "24245244cdvd",
                    company:"gsddfgd",
                    positions:2,
                    salary:3245234,
                },
                user:{
                    id:"434grgtrhbe543ftg"
                }
            };
            const mockRes = mockResponse();
            await newJob(mockReq,mockRes);
            expect(mockRes.status).toHaveBeenCalledWith(200);
            expect(mockRes.json).toHaveBeenCalledWith({
                job:mockJob
            });
            
        })
    })
})