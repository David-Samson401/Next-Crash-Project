import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <header>
      <nav>
        <Link href="/" className="logo">
          <Image
            src="/icons/logo.png"
            alt="DevEvents logo"
            width={24}
            height={24}
          />
          <p>DevEvents</p>
        </Link>
        <ul>
          <Link href="/">Home</Link>
          <Link href="/events">Event</Link>
          <Link href="/events/create">Create Event</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
