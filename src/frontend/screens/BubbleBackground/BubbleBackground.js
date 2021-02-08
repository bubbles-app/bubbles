import './BubbleBackground.css';

function Bubbles({ themeColor, themeTransparency }) {
  const colorTransparent = themeColor + themeTransparency;
  return (
    <div
      className="Bubbles"
      style={{ backgroundImage: `linear-gradient(to bottom right, ${colorTransparent}, ${themeColor})` }}
    >
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
      <div className="bubble" />
    </div>
  );
}

export default Bubbles;
