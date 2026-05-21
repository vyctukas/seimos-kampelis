import ChatRoom from "@/app/components/ChatRoom";
import PageHeader from "@/app/components/PageHeader";

export default function ChatPage() {
  return (
    <div>
      <PageHeader
        emoji="💬"
        title="Pokalbiai"
        subtitle="Bendras šeimos susirašinėjimas ir asmeniniai pokalbiai"
      />
      <ChatRoom mode="family" />
    </div>
  );
}
