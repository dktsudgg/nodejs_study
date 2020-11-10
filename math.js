// nodejs에서 커스텀 모듈 작성 방법
function sum (a, b) {
    return a+b;
}

module.exports = {
    sum: sum
}