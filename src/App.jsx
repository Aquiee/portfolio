import { useEffect, useState, useRef } from "react";
import emailjs from "@emailjs/browser";

export default function App() {
    const [activeSection, setActiveSection] = useState("home");
    const [status, setStatus] = useState("");
    const form = useRef();

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["home", "about", "projects", "contact"];
            let currentSection = "home";

            for (let section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (
                        rect.top <= window.innerHeight / 2 &&
                        rect.bottom >= window.innerHeight / 2
                    ) {
                        currentSection = section;
                        break;
                    }
                }
            }
            setActiveSection(currentSection);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleScrollTo = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setStatus("Sending...");

        emailjs
            .sendForm("service_olmktlr", "template_q5mtxp7", form.current, {
                publicKey: "CPITssY1Wd_dS_ATw",
            })
            .then(
                () => {
                    setStatus("Message sent successfully!");
                    form.current.reset();
                },
                (error) => {
                    setStatus("Failed to send message.");
                    console.log("FAILED...", error.text);
                }
            );
    };

    return (
        <div className="flex flex-col items-center">
            {/* Navigation Bar */}
            <nav className="flex space-x-5 text-2xl justify-center p-4 fixed top-0 bg-green-800 text-white w-full shadow-md">
                {["home", "about", "projects", "contact"].map((section) => (
                    <button
                        key={section}
                        onClick={() => handleScrollTo(section)}
                        className={activeSection === section ? "underline" : ""}
                    >
                        {section.charAt(0).toUpperCase() + section.slice(1)}
                    </button>
                ))}
            </nav>

            {/* Sections */}
            <div
                id="home"
                className="h-screen w-full flex items-center justify-center bg-green-100"
            >
                <h1 className="text-4xl text-green-900">Home</h1>
            </div>
            <div
                id="about"
                className="h-screen w-full flex items-center justify-center bg-green-200"
            >
                <h1 className="text-4xl text-green-900">About</h1>
            </div>
            <div
                id="projects"
                className="h-screen w-full flex items-center justify-center bg-green-300"
            >
                <h1 className="text-4xl text-green-900">Projects</h1>
            </div>
            <div
                id="contact"
                className="h-screen w-full flex flex-col items-center justify-center bg-green-400 p-4"
            >
                <h1 className="text-4xl mb-4 text-white">Contact</h1>
                <form
                    ref={form}
                    className="flex flex-col space-y-4"
                    onSubmit={handleSubmit}
                >
                    <input
                        type="text"
                        name="from_name"
                        placeholder="Your Name"
                        className="p-2 border rounded bg-green-50"
                        required
                    />
                    <input
                        type="email"
                        name="from_email"
                        placeholder="Your Email"
                        className="p-2 border rounded bg-green-50"
                        required
                    />
                    <textarea
                        name="message"
                        placeholder="Your Message"
                        className="p-2 border rounded bg-green-50"
                        required
                    />
                    <button
                        type="submit"
                        className="p-2 bg-green-700 text-white rounded"
                    >
                        Send Message
                    </button>
                </form>
                {status && <p className="mt-2 text-white">{status}</p>}
            </div>
        </div>
    );
}
