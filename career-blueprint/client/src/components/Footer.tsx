function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-8 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-[#095859] flex items-center justify-center text-white font-bold text-xs">
            CB
          </div>
          <span className="font-semibold text-[#095859] text-sm">Career Blueprint</span>
        </div>
        <p className="text-xs text-[#5C6B6B]">
          © {new Date().getFullYear()} Career Blueprint. All rights reserved.
        </p>
        
          <a href="mailto:info.careersblueprint@gmail.com"
          className="text-xs text-[#5C6B6B] hover:text-[#095859]"
        >
        info.careersblueprint@gmail.com
        </a>
      </div>
    </footer>
  );
}

export default Footer;