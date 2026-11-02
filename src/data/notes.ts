export type NoteTopic = 'ai' | 'design' | 'engineering' | 'open-source' | 'studio';

export type NoteBlock =
	| { type: 'p'; text: string }
	| { type: 'h2'; text: string }
	| { type: 'code'; text: string };

export type Note = {
	slug: string;
	title: string;
	topic: NoteTopic;
	category: string;
	date: string;
	minutes: number;
	image: string;
	span: 5 | 6 | 7;
	excerpt: string;
	body: NoteBlock[];
};

export const notes: Note[] = [
	{
		slug: 'designing-chrome-that-still-looks-like-chrome',
		title: 'Designing chrome that still looks like chrome',
		topic: 'design',
		category: 'Design',
		date: 'Oct 10, 2026',
		minutes: 6,
		image: '/notes/chrome.jpg',
		span: 7,
		excerpt:
			'The frame around a product is part of the product. We stopped hiding it, and the tools got easier to trust.',
		body: [
			{
				type: 'p',
				text: 'Chrome is the part people touch before they touch the work: the nav, the title bar, the status line, the thing that says where you are. We kept trying to make it disappear. Thinner borders, quieter type, fewer labels. The page looked calmer in a screenshot and harder to use on a Tuesday.',
			},
			{ type: 'h2', text: 'Quiet is not the same as clear' },
			{
				type: 'p',
				text: 'A control can be visually quiet and still be obvious. What failed was removing the landmarks. People could not tell which region was the document, which was the tool, and which was just decoration. We put the structure back: a paper surface for the work, a dark footer for the studio, and a gold mark you can find without reading.',
			},
			{ type: 'h2', text: 'What we kept' },
			{
				type: 'p',
				text: 'One type family for the interface, a mono label for anything that behaves like a control, and a single accent that only shows up on actions and categories. The chrome looks like chrome again. That is the point. You should know you are in the product, not in a poster of the product.',
			},
		],
	},
	{
		slug: 'the-case-for-a-single-binary-in-an-ai-stack',
		title: 'The case for a single binary in an AI stack',
		topic: 'engineering',
		category: 'Engineering',
		date: 'Sep 26, 2026',
		minutes: 11,
		image: '/notes/binary.jpg',
		span: 5,
		excerpt:
			'An agent stack with six services is a stack you will debug at midnight. We ship one binary and let the process be the architecture.',
		body: [
			{
				type: 'p',
				text: 'Every extra service is a port, a health check, a deploy step, and a log stream that does not share a clock with the others. For a studio tool that one person runs locally and two people run in production, that tax shows up before the feature does.',
			},
			{ type: 'h2', text: 'One process, explicit boundaries' },
			{
				type: 'p',
				text: 'We still split the code. The model client, the job runner, and the HTTP API live in different packages. They meet in one main. Startup order is a function call, not a compose file. If a boundary needs to become a service later, the package already has a door. We have not needed the door.',
			},
			{
				type: 'code',
				text: ['kilas-flow', '├── cmd/flow/main.go', '├── internal/agent', '├── internal/jobs', '└── internal/http'].join('\n'),
			},
			{ type: 'h2', text: 'What we gave up' },
			{
				type: 'p',
				text: 'We gave up independent scaling. The agent loop and the API share a CPU budget. That is acceptable while the bottleneck is the model provider, not our process. When that stops being true, we will split the binary on purpose, with a number, not a feeling.',
			},
		],
	},
	{
		slug: 'what-an-agent-actually-needs-from-your-api',
		title: 'What an agent actually needs from your API',
		topic: 'ai',
		category: 'AI',
		date: 'Sep 12, 2026',
		minutes: 7,
		image: '/notes/agent.jpg',
		span: 5,
		excerpt:
			'An agent does not need your whole API. It needs a small set of calls that name the outcome, the inputs, and what done looks like.',
		body: [
			{
				type: 'p',
				text: 'Endpoints shaped like our database tables force the model to invent the workflow. Endpoints shaped like the job — open a note, file a change, ask for review — let the model pick a verb it can explain. We write the description in the same sentence a teammate would use.',
			},
			{ type: 'h2', text: 'Return the next fact' },
			{
				type: 'p',
				text: 'A 200 with an id is not enough. The response should say what changed, what is still missing, and which call to make next. The model will guess if you leave a blank. Guessing is how a clean API becomes a retry loop.',
			},
			{ type: 'h2', text: 'Keep the surface stable' },
			{
				type: 'p',
				text: 'We version by adding fields, not by renaming the ones a prompt already learned. A breaking change is a new tool, with the old one left in place until the transcripts stop calling it.',
			},
		],
	},
	{
		slug: 'we-rewrote-our-docs-and-cut-support-in-half',
		title: 'We rewrote our docs and cut support in half',
		topic: 'studio',
		category: 'Studio',
		date: 'Aug 29, 2026',
		minutes: 5,
		image: '/notes/docs.jpg',
		span: 7,
		excerpt:
			'Support dropped because the docs started answering the question people actually asked, in the order they asked it.',
		body: [
			{
				type: 'p',
				text: 'We exported three months of support and grouped them by the first sentence. Half of them were the same five questions, asked after someone had already read the page we thought covered it. The page covered the architecture. The question was about the first ten minutes.',
			},
			{ type: 'h2', text: 'One path, then the map' },
			{
				type: 'p',
				text: 'Each guide now starts with the path that works: install, run, see a result. The reference sits under that, not instead of it. We deleted sections that existed to explain a decision we had already reversed.',
			},
			{ type: 'h2', text: 'The half' },
			{
				type: 'p',
				text: 'Support volume fell by about half over the next six weeks. The remaining tickets were real product bugs, which is a better inbox. The docs did not get longer. They got sequenced.',
			},
		],
	},
	{
		slug: 'sqlite-is-not-a-toy',
		title: 'SQLite is not a toy',
		topic: 'open-source',
		category: 'Open source',
		date: 'Aug 15, 2026',
		minutes: 9,
		image: '/notes/sqlite.jpg',
		span: 6,
		excerpt:
			'We keep product state in a single SQLite file. It is backed up with the file, queried with SQL, and fast enough that we stopped planning the migration.',
		body: [
			{
				type: 'p',
				text: 'Backup is copy. Restore is replace. There is no cluster to rehearse. For notes, jobs, and the small amount of account state Kilaslab holds, that story is the one we can explain to ourselves at 1 a.m.',
			},
			{ type: 'h2', text: 'Write the queries you mean' },
			{
				type: 'p',
				text: 'The fear with SQLite is that you will outgrow it quietly. We measure the queries we actually run. The hot path is a point lookup and a short insert. Both sit well under a millisecond on a laptop disk. The day a query shows up in a profile, we will index it or change it. We will not pre-migrate.',
			},
			{
				type: 'code',
				text: ['create table notes (', '  slug text primary key,', '  title text not null,', '  published_at text not null', ');'].join('\n'),
			},
			{ type: 'h2', text: 'When we would leave' },
			{
				type: 'p',
				text: 'We would leave for a workload that needs more than one writer process, or for a dataset that no longer fits on one disk we are willing to manage. Neither is true. Until it is, SQLite is the production database, not a prototype we are apologizing for.',
			},
		],
	},
	{
		slug: 'shipping-is-a-design-decision',
		title: 'Shipping is a design decision',
		topic: 'studio',
		category: 'Studio',
		date: 'Aug 01, 2026',
		minutes: 4,
		image: '/notes/shipping.jpg',
		span: 6,
		excerpt:
			'A design that cannot ship in the current codebase is a different design. We choose the version we can put in front of someone this week.',
		body: [
			{
				type: 'p',
				text: 'Scope is not what we trim after the pictures are done. It is the design. If the note page needs a new type system, a new CMS, and a new image pipeline, we do not have a note page. We have a program. The page we ship uses the type, the grid, and the images the archive already has.',
			},
			{ type: 'h2', text: 'Show the real page' },
			{
				type: 'p',
				text: 'We review in the browser, on the same route a reader will open. A frame that cannot be clicked is a hypothesis. The click is the critique: does the title go to the note, does the back link return you to the list, does the next note look like it belongs here.',
			},
			{ type: 'h2', text: 'Leave a seam' },
			{
				type: 'p',
				text: 'Shipping the smaller version only works if the next version has somewhere to attach. The note is a slug, a topic, and a body. When a CMS shows up, it fills those fields. It does not get to rename the page.',
			},
		],
	},
];

export const noteTopics = [
	{ id: 'all', label: 'All', count: 12 },
	{ id: 'ai', label: 'AI', count: 3 },
	{ id: 'design', label: 'Design', count: 2 },
	{ id: 'engineering', label: 'Engineering', count: 3 },
	{ id: 'open-source', label: 'Open source', count: 2 },
	{ id: 'studio', label: 'Studio', count: 2 },
] as const;

export type NoteTopicFilter = (typeof noteTopics)[number]['id'];

export function relatedNotes(note: Note, count = 2): Note[] {
	const others = notes.filter((item) => item.slug !== note.slug);
	return [...others.filter((item) => item.topic === note.topic), ...others.filter((item) => item.topic !== note.topic)].slice(
		0,
		count,
	);
}
