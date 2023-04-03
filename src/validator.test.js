const { Validator, ValidationError } = require('./validator');

describe('[Validator]run method', () => {
    test('Should return true when given a topic "a", name "a" and the description is more than 10 and less than 100 chars', () => {
        const content = {
            topic: 'a',
            name: 'a',
            description: 'Just a description'
        }
        const validator = new Validator(content);
        const result = validator.run();

        expect(result).toEqual(true);
    });

    test('Should return true when given a topic "b", name "x" and the description is less than 40 chars', () => {
        const content = {
            topic: 'b',
            name: 'x',
            description: 'Just a description'
        }
        const validator = new Validator(content);
        const result = validator.run();

        expect(result).toEqual(true);
    });

    test('Should accept either upper and lower cases for "topic" and "name" properties', () => {
        const contentUpperCase = {
            'topic': 'A',
            'name': 'A',
            'description': 'Just a description'
        }
        const validatorUpperCase = new Validator(contentUpperCase);
        const resultUpperCase = validatorUpperCase.run();

        const contentLowerCase = {
            'topic': 'a',
            'name': 'a',
            'description': 'Just a description'
        }
        const validatorLowerCase = new Validator(contentLowerCase);
        const resultLowerCase = validatorLowerCase.run();

        expect(resultUpperCase).toEqual(true);
        expect(resultLowerCase).toEqual(true);
    });

    test('Should throw a ValidationError exeption when the content is not valid', () => {
        const content = {
            'topic': 'A',
            'name': 'B',
            'description': 'Just a description'
        }
        const validator = new Validator(content);
        const result = () => validator.run();

        expect(result).toThrow(ValidationError);
    });
});