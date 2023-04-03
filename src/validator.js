class Validator {
    constructor(content) {
        this.content = {
            ...content,
            topic: content.topic.toLowerCase(),
            name: content.name.toLowerCase(),
        };
    }

    run() {
        const ruleByTopic = this.rulesByTopic()[this.content.topic];
        return ruleByTopic();
    }

    rulesByTopic() {
        return {
            'a': () => {
                if(
                    (this.content.description.length >= 10 && this.content.description.length <= 100) &&
                    this.content.name === 'a'
                ) {
                    return true;
                }

                throw new ValidationError('Given topic equal to A, then name has to be equal to "A" and the description has to be more than 10 and less than 100 chars');
            },
            'b': () => {
                if(this.content.description.length < 40 && this.content.name === 'x') {
                    return true;
                }

                throw new ValidationError('Given topic equal to B, then name has to be equal to "X" and the description has to be less than 40 chars');
            }
        }
    }
}

class ValidationError extends Error {
    constructor(message) {
        super(`ValidationError: ${message}`);
    }
}

module.exports = {
    Validator,
    ValidationError
}
