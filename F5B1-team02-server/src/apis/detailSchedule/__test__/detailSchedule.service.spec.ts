class MockDetailRepository {
  mydb = [
    {
      day: '1',
      date: '2022-03-31',
      startTime: '08:00',
      useTime: '2시간',
      place: '제주도',
      memo: '좋아요',
      scheduleId: '01',
    },
  ];
  save({ schedule, ...mydb }) {
    const result = { schedule, ...mydb };
    this.mydb.push({ ...mydb });

    // this.mydb.push(result);
    return null;
  }
}
