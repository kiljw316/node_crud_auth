const { isNickname, isPassword } = require('./validation');

test('닉네임 최소 3자이상, 알파벳 대소문자(a~z, A~Z), 숫자(0~9)로 이루어져 있고 DB에 있는 데이터와 중복되면 안된다.', () => {
    expect(isNickname("register")).toEqual(true);
    expect(isNickname("admin")).toEqual(false);
    expect(isNickname("ad")).toEqual(false);
    expect(isNickname("admin@")).toEqual(false);
   
});

test("비밀번호는 최소 4자 이상이며, 닉네임과 같은 값이 포함된 경우 회원가입에 실패, 비밀번호와 비밀번호 확인은 정확하게 일치해야함", () => {
    expect(isPassword("admin", "master1234", "master1234")).toEqual(true);
    expect(isPassword("adminn1234", "adminn1234", 'adminn1234')).toEqual(false);
    expect(isPassword("admin", "123", "123")).toEqual(false);
});