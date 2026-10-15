import Disclosure from "./Disclosure";

const discoveries = [
  {
    command: "whoami",
    content: <p>The human behind the code. Building useful cloud products, one thoughtful decision at a time.</p>,
  },
  {
    command: "ls projects/",
    content: <p>Web, mobile, TV, and desktop. Different screens, useful software. <a href="#projects">Explore the projects →</a></p>,
  },
  {
    command: "cat principles.md",
    content: <p>Start with the problem. Keep the moving parts few. Make the details count.</p>,
  },
  {
    command: "coffee",
    content: <><pre role="img" aria-label="A small cup of coffee">{"  ( (\n  ) )\n .---.\n |   |]\n `---'"}</pre><p>A small pause. A fresh perspective.</p></>,
  },
  {
    command: "hello",
    content: <p><span lang="ro">Salut</span> · <span lang="en">Hello</span> · <span lang="it">Ciao</span> · <span lang="ru">Привет</span>. Four ways to start a conversation.</p>,
  },
  {
    command: "42",
    content: <p>The answer is a classic. Finding the right question is the interesting part.</p>,
  },
  {
    command: "ship",
    content: <><pre role="img" aria-label="A tiny rocket ready to launch">{"   /\\\n  |  |\n /|  |\\\n  /__\\\n   **"}</pre><p>Small release. Real feedback. A little better next time.</p></>,
  },
  {
    command: "exit",
    content: <p>End of this little shell. Start a real conversation? <a href="#contact">Say hello →</a></p>,
  },
];

export default function TerminalSecrets() {
  return (
    <Disclosure id="workbench" className="terminal-secrets" summary={<span>Inspect workspace <span className="text-secondary">· {discoveries.length} discoveries</span></span>}>
      <div className="secret-commands">
        {discoveries.map(({ command, content }) => (
          <Disclosure key={command} name="portfolio-discoveries" className="secret-command" summary={<><span className="text-code" aria-hidden="true">$</span><code>{command}</code></>}>
            <div className="secret-output">{content}</div>
          </Disclosure>
        ))}
      </div>
    </Disclosure>
  );
}
