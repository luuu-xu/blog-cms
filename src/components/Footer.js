import "../styles/Footer.css";

export default function Footer() {
  return (
    <footer className="footer fixed-bottom bg-light mt-4 p-4">
      <div className="container d-flex justify-content-between align-items-center">
        <p className="mb-0">
          {"Blog CMS built with React & Bootstrap by "}
          <a href="https://github.com/luuu-xu">@luuu-xu</a>
        </p>
        <a href="#" className="d-none d-md-block">Back to top</a>
        <a href="#" className="d-md-none">Top</a>
      </div>
    </footer>
  );
}