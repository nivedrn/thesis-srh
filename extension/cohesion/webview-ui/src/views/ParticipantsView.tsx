import { Participant } from "../App";

// Define the props for ParticipantsView
interface ParticipantsViewProps {
    participants: Participant[];
}

const ParticipantsView = ({ participants }: ParticipantsViewProps) => {
    return (
        <>
            {
                participants.length > 0 ? participants.map(participant => (
                    <li key={participant.id}>{participant.name}</li>
                )) : (
                    <div>
                        No participants yet. Share the session link to invite people.
                    </div>
                )
            }
        </>
    )
}

export default ParticipantsView