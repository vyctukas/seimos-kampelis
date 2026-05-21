import ChatRoom from "@/app/components/ChatRoom";
import PageHeader from "@/app/components/PageHeader";

type Props = {
  params: Promise<{ memberId: string }>;
};

export default async function PrivateChatPage({ params }: Props) {
  const { memberId } = await params;

  return (
    <div>
      <PageHeader emoji="💬" title="Asmeninis pokalbis" />
      <ChatRoom mode="private" memberId={memberId} />
    </div>
  );
}
