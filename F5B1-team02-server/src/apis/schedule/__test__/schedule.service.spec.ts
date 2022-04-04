import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Repository } from 'typeorm';
import { Schedule } from '../entities/schedule.entity';
import { ScheduleService } from '../schedule.service';

class MockScheduleRepository {
  userData = [
    {
      id: 'aa',
    },
  ];

  scheduleData = [
    {
      title: '제주도 여행',
      location: '제주도',
      startDate: '2022-02-02',
      endDate: '2022-02-02',
      numberPeople: '3명',
      hashtag: ' 가족여행',
      mainCategory: '1',
      tripdates: '2022-02-02,2022-02-03',
    },
  ];
  save({}) {
    return;
  }
}

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;
describe('ScheduleService', () => {
  let scheduleService: ScheduleService;
  let scheduleRepository: MockRepository<Schedule>;

  beforeEach(async () => {
    const scheduleModule = await Test.createTestingModule({
      providers: [
        ScheduleService,
        {
          provide: getRepositoryToken(Schedule),
          useClass: MockScheduleRepository,
        },
        {
          provide: getRepositoryToken(MainCategory),
          useClass: MockScheduleRepository,
        },
        {
          provide: getRepositoryToken(User),
          useClass: MockScheduleRepository,
        },
      ],
    }).compile();
    scheduleService = scheduleModule.get<ScheduleService>(ScheduleService);
    scheduleRepository = scheduleModule.get<MockRepository<Schedule>>(
      getRepositoryToken(Schedule),
    );
  });

  describe('create', () => {
    it('일정 생성하기', async () => {
      const result = await scheduleService.create({ userData, scheduleData });
      expect(result);
    });
  });
});
