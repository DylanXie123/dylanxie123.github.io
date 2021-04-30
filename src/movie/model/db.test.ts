import LC from 'leanengine';
import Live from 'leancloud-storage/live-query';

describe('Leancloud Test', () => {

  beforeAll(() => {
    LC.init({
      appId: process.env.REACT_APP_LEAN_ID!,
      appKey: process.env.REACT_APP_LEAN_KEY!,
    });
  });

  test('Hello', async () => {
    await LC.Cloud.run('hello', undefined, { remote: true }).then((data) => {
      expect(data).toBe('Hello world!')
    }, (err) => {
      console.log(err);
      expect(fail);
    });
  });

  test('DB', () => {
    const query = new Live.Query('Todo');
    query.subscribe().then((liveQuery) => {
      liveQuery.on('update', (newTodo) => {
        console.log(newTodo?.get('title'));
      })
    });
  });
})