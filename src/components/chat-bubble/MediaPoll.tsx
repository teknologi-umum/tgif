import type { TelegramMessagePoll } from "~/service/Parser";
import "./MediaPoll.scss";

// colorblind-friendly colors
// and Telegram has maximum of 10 options
const colors = [
	"#1F77B4", // Strong Blue
	"#FF7F0E", // Strong Orange
	"#2CA02C", // Strong Green
	"#D62728", // Strong Red
	"#9467BD", // Strong Purple
	"#8C564B", // Strong Brown
	"#E377C2", // Strong Pink
	"#7F7F7F", // Medium Gray
	"#BCBD22", // Strong Yellow
	"#17BECF", // Strong Cyan
];

export function MediaPoll(props: TelegramMessagePoll) {
	const chartSize = 20;
	const barWidth = 20 / props.pollResult.length;

	const maxVotes = Math.max(...props.pollResult.map((opt) => opt.votes));
	const normalizeVotes = (vote: number) => (vote / maxVotes) * chartSize * /* provide some top padding */ 0.8;

	return (
		<div class="poll">
			<svg class="poll-chart" xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${chartSize} ${chartSize}`}>
				<title innerHTML={props.text} />

				<g class="poll-bars">
					{props.pollResult.map((option, i) => (
						<>
							<rect
								x={i * barWidth}
								y={chartSize - normalizeVotes(option.votes)}
								height={normalizeVotes(option.votes)}
								width={barWidth}
								fill={colors[i] ?? "#7f7f7f"}
							/>
							<text
								x={i * barWidth + barWidth / 2}
								y={chartSize - normalizeVotes(option.votes) - 2}
								font-size="0.14rem"
								text-anchor="middle"
							>
								{option.votes}
							</text>
						</>
					))}
				</g>
			</svg>
			<div class="poll-legend">
				{props.pollResult.map((option, i) => (
					<span style={{ "--marker-color": colors[i] }}>{option.text}</span>
				))}
			</div>
		</div>
	);
}
