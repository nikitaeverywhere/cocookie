import test from "ava";
import { CLIEngine } from "eslint";

const engine = new CLIEngine({
    envs: ["node"],
    useEslintrc: true,
});

function formatMessages (messages) {
    const errors = messages.map((message) => {
        return `${message.line}:${message.column} ${message.message.slice(0, -1)
            } (${message.ruleId})\n`;
    });
    return `${errors.join("\n")}`;
}

test("Tests running", t => {
    t.pass();
});

engine.executeOnFiles(["index.js"]).results.forEach(({ filePath, messages }) => {
    test(`Validate ${ filePath }`, (t) => {
        t.is(messages.length === 0, true, formatMessages(messages));
    });
});