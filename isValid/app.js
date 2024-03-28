function isValid(s) {
    const stack = [];
    const brackets = { '(': ')', '[': ']', '{': '}' };
    for (let char of s) {
        if (brackets[char]) {
            stack.push(char);
        } else if (brackets[stack.pop()] !== char) {
            return false;
        }
    }
    return stack.length === 0;
}

// Пример использования
console.log(isValid("()"));
console.log(isValid("()[]{}"));
console.log(isValid("(]"));
console.log(isValid("([)]"));      
console.log(isValid("{[]}")); 