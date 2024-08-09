function Footer() {
  const currentyear = new Date().getFullYear();
  return (
    <div className="py-2 px-2 flex items-center justify-between text-sm">
      <p>&copy; Copyright {currentyear} | All rights reserved</p>
      <p className="hidden sm:block">
        Developed and Designed by{" "}
        <a
          href="https://developerjaskaran.netlify.app/"
          target="_blank"
          className="text-muted-foreground font-bold"
        >
          Jaskaran Singh
        </a>
      </p>
    </div>
  );
}

export default Footer;
