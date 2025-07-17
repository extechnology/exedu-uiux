import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/919072123466" 
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-violet-500  to-fuchsia-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 animate-bounce"
      title="Chat with us on WhatsApp"
    >
      <FaWhatsapp className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppButton;
