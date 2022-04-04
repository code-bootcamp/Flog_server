// import { Test, TestingModule } from '@nestjs/testing';
// import { DetailScheduleResolver } from '../detailSchedule.resolver';
// import { DetailScheduleService } from '../detailSchedule.service';

// describe('DetailScheduleResolver', () => {
//   let detailScheduleResolver: DetailScheduleResolver;
//   beforeEach(async () => {
//     const appModule: TestingModule = await Test.createTestingModule({
//       providers: [DetailScheduleService],
//     }).compile();
//     detailScheduleResolver = appModule.get(DetailScheduleService);
//   });

//   describe('createDetailSchedule', () => {
//     it('세부일정 등록', async () => {
//       const scheduleId = '01';
//       const detailData = {
//         day: '1',
//         date: '2022-01-01',
//         startTime: '08:00',
//         useTime: '2시간',
//         place: '제주도',
//         memo: '맛집이였다',
//       };

//       const result = await detailScheduleResolver.createDetailSchedule(
//         { ...detailData },
//         scheduleId,
//       );
//       expect(result);
//     });
//   });
// });
describe('UserrResolver', () => {
  beforeEach(() => {});

  describe('createUser', () => {
    it('create', () => {
      // 컨트롤러와 같은 방식으로 테스트하면 됨!!!
    });
  });
});
