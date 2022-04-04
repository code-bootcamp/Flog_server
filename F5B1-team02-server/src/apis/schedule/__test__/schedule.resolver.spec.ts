import { Test, TestingModule } from '@nestjs/testing';
import { MAINCATEGORY_ENUM } from 'src/apis/mainCategory/entities/mainCategory.entity';
import { ScheduleResolver } from '../schedule.resolver';
import { ScheduleService } from '../schedule.service';

describe('ScheduleResolver', () => {
  let scheduleResolver: ScheduleResolver;

  beforeEach(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      providers: [ScheduleService],
    }).compile();
    scheduleResolver = appModule.get(ScheduleResolver);
  });

  describe('createSchedule', () => {
    it('일정등록', async () => {
      const userData = {
        id: 'aa',
        email: 'aa@aa',
        exp: '1',
      };
      const MAINCATEGORY_ENUM = {
        MINE: '나의 여행',
        OUR: '우리의 여행',
        MYPAGE: '마이페이지',
      };
      const scheduleData = {
        title: '제주도 여행',
        location: '제주도',
        startDate: '2022-02-02',
        endDate: '2022-02-02',
        numberPeople: 'THREE',
        hashtag: 'FAMILY',
        mainCategoryName: typeof enum:MYPAGE,
        // mainCategoryName: MAINCATEGORY_ENUM.MYPAGE,
        tripdates: '2022-02-02,2022-02-03',
      };
      const result = await scheduleResolver.createSchedule(
        userData,
        scheduleData,
      );
      expect(result);
    });
  });
});
