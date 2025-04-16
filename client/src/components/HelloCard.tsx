type Props = {
  name: string;
};

const HelloCard = ({ name }: Props) => {
  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}>
      👋 Hello, {name}!
    </div>
  );
};

export default HelloCard;
