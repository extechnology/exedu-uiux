import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton = () => {
  const message = encodeURIComponent("Hi,May i get more info about exedu.");

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end gap-3 group">
      {/* Welcome Message Bubble */}
      {/* <div className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-2xl rounded-br-sm shadow-xl border border-gray-100/50 mb-2 transform transition-all duration-300 opacity-100 group-hover:-translate-y-1">
        <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
          Hi there! 👋 Need help?
        </p>
      </div> */}

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/919562123466?text=${message}`} 
        target="_blank"
        rel="noopener noreferrer"
        className="bg-gradient-to-r from-violet-500 to-fuchsia-500 hover:from-green-500 hover:to-green-600 text-white p-4 rounded-full shadow-lg shadow-violet-500/30 transition-all duration-300 hover:scale-110 animate-bounce"
        title="Chat with us on WhatsApp"
      >
        <FaWhatsapp className="w-7 h-7" />
      </a>
    </div>
  );
};

export default WhatsAppButton;
