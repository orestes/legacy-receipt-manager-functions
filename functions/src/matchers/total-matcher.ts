
const parsers: string[] = [
    `[^\\d]?((\\d{1,3}(\\.|\\,))?(\\d{1,3}(\\.|\\,))?\\d{1,3}(\\.|\\,)(\\d{1,2}))[^\\d]?%mark%`,
    `%mark%[^\\d]?((\\d{1,3}(\\.|\\,))?(\\d{1,3}(\\.|\\,))?\\d{1,3}(\\.|\\,)(\\d{1,2}))`,
];

export class TotalMatcher {

    public static getTotal = (input: string, currency: string[]): number => {
        for(let mark of currency) {
            for(let r of parsers) {
                const matched = TotalMatcher.match(input, mark, r);
                if (matched) {
                    return matched;
                }
            }
        }

        return null;
    };

    private static match(input, mark: string, regex: string): number|null {
        const r = new RegExp(regex.replace('%mark%', mark), 'ig');

        const matches = (input.match(r) || [])
            .map(t => t.replace(/[^\d]/ig, ''))
            .map(t => parseInt(t) / 100)
            .map(t => parseFloat(t.toFixed(2)))
            .sort((a, b) => a - b); // sort asc

        if (!matches) {
            return null;
        }

        return matches.pop();
    }

}
