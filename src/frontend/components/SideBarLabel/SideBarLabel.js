function SideBarLabel({ label, className, onClick }) {
  return (
    <p className={className} onClick={onClick}>
      {label}
    </p>
  );
}

export default SideBarLabel;
