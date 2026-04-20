/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import { 
  ShieldCheck, 
  MapPin, 
  Phone, 
  ArrowRight, 
  Users, 
  CheckCircle,
  Menu,
  X,
  MessageCircle,
  Quote,
  ChevronLeft,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Home,
  Briefcase,
  Landmark,
  Compass,
  FileSearch,
  Layers,
  Fingerprint,
  Video,
  Eye,
  Camera,
  PlayCircle,
  Rotate3D,
  Calendar,
  Clock,
  Car,
  Bell,
  Check,
  VolumeX,
  Volume2
} from "lucide-react";
import * as React from "react";
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";

const APP_NAME = "Samfall Estate";
const WHATSAPP_LINK = "https://wa.me/2348000000000"; // Placeholder

const RecentAcquisitionTicker = () => {
  const [current, setCurrent] = useState(0);
  const events = [
    "Security Secured: 2 Plots in Alagbaka Extension just fully vetted.",
    "New Acquisition: Investor from London just secured an acre at Oda Road.",
    "Verification Success: Ministry clearance completed for Emerald Hills Estate.",
    "Handover Status: Physical plot allocation for Ijapo Extension tomorrow."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % events.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-brand-primary py-2.5 px-4 overflow-hidden relative border-b border-white/5">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex items-center gap-2 shrink-0"
        >
          <span className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></span>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-brand-accent">Live Activity</span>
        </motion.div>
        
        <div className="h-4 w-[1px] bg-white/20"></div>

        <AnimatePresence mode="wait">
          <motion.p
            key={current}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-[10px] md:text-[11px] font-bold text-white/90 italic tracking-wide"
          >
            {events[current]}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
};

const SchedulerModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [needsChauffeur, setNeedsChauffeur] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      onClose();
    }, 3000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-primary/80 backdrop-blur-md"
          ></motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="bg-white w-full max-w-lg shadow-2xl relative z-10 overflow-hidden flex flex-col"
          >
            <div className="bg-brand-primary p-8 text-white">
              <button 
                onClick={onClose}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
              <p className="text-[10px] font-black uppercase tracking-[.3em] text-brand-accent mb-2">Remote & Local</p>
              <h2 className="font-serif text-3xl italic">Book a <span className="not-italic font-bold">Physical Inspection</span></h2>
            </div>

            <div className="p-8">
              {!isSubmitted ? (
                <form onSubmit={handleBooking} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="flex flex-col items-center justify-center p-4 bg-brand-bg border border-brand-border rounded-sm">
                      <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        modifiers={{
                          disabled: { before: new Date() }
                        }}
                        className="m-0 scale-90 origin-top"
                      />
                    </div>
                    <div className="space-y-6">
                       <div>
                          <label className="text-[10px] font-black uppercase tracking-widest text-[#1A1A1A] block mb-3">Preferred Time</label>
                          <div className="grid grid-cols-2 gap-2">
                            {["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"].map((time) => (
                              <button key={time} type="button" className="py-2 border border-brand-border text-[10px] font-bold hover:bg-brand-primary hover:text-white transition-all">
                                {time}
                              </button>
                            ))}
                          </div>
                       </div>
                       
                       <div className="pt-4 border-t border-brand-border">
                          <label className="flex items-center gap-3 cursor-pointer group">
                             <input 
                              type="checkbox" 
                              checked={needsChauffeur} 
                              onChange={() => setNeedsChauffeur(!needsChauffeur)}
                              className="hidden" 
                             />
                             <div className={`w-10 h-10 flex items-center justify-center border transition-all ${needsChauffeur ? "bg-brand-accent border-brand-accent text-white" : "border-brand-border text-gray-300"}`}>
                                <Car size={20} />
                             </div>
                             <div>
                                <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary">Request Chauffeur</p>
                                <p className="text-[9px] text-gray-400 italic">Pickup from your Akure hotel</p>
                             </div>
                          </label>
                       </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-brand-border">
                    <div className="flex justify-between items-center mb-6">
                       <div className="flex items-center gap-2">
                          <Calendar size={14} className="text-brand-accent" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">{selectedDate ? format(selectedDate, "PPP") : "Select a date"}</span>
                       </div>
                       <div className="flex items-center gap-2">
                          <Clock size={14} className="text-brand-accent" />
                          <span className="text-[10px] font-bold uppercase tracking-widest">11:00 AM</span>
                       </div>
                    </div>
                    
                    <button type="submit" className="w-full bg-brand-primary text-brand-accent py-4 text-[11px] font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-xl">
                      Confirm Reservation
                    </button>
                  </div>
                </form>
              ) : (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center"
                >
                  <div className="w-16 h-16 bg-brand-accent/20 text-brand-accent flex items-center justify-center rounded-full mx-auto mb-6">
                    <Check size={32} />
                  </div>
                  <h3 className="font-serif text-2xl italic text-brand-primary mb-4">Inspection Confirmed</h3>
                  <p className="text-sm text-gray-500 max-w-xs mx-auto italic">
                    Our team will contact you via phone or WhatsApp shortly to coordinate the meeting point {needsChauffeur && "and chauffeur pickup"}.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
const locations = ["Alagbaka", "Ijapo Estate", "Oda Road", "FUTA Area", "Ilesha Road"];
const propertyTypes = ["Residential Plot", "Commercial Land", "Acreage/Farm", "Estate Plot"];

interface PropertyDetails {
  sqft: string;
  type: string;
  description: string;
  features: string[];
  videoUrl?: string;
  panoramaUrl?: string;
}

const VirtualMediaViewer = ({ property, activeTab, onTabChange }: { property: any, activeTab: string, onTabChange: (tab: string) => void }) => {
  return (
    <div className="relative h-full flex flex-col">
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence mode="wait">
          {activeTab === "photo" && (
            <motion.div 
              key="photo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <img 
                src={property.img} 
                className="w-full h-full object-cover" 
                alt={property.area} 
                referrerPolicy="no-referrer"
              />
            </motion.div>
          )}

          {activeTab === "video" && (
            <motion.div 
              key="video"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black"
            >
              <iframe 
                src={`${property.details.videoUrl}?autoplay=1&mute=1&controls=0&loop=1`} 
                className="w-full h-full border-none"
                allow="autoplay; encrypted-media"
                title="Drone Tour"
              ></iframe>
            </motion.div>
          )}

          {activeTab === "360" && (
            <motion.div 
              key="360"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-brand-primary"
            >
              <img 
                src={property.details.panoramaUrl || property.img} 
                className="w-full h-full object-cover animate-pan-slow scale-150" 
                alt="360 View" 
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none">
                 <div className="text-center">
                    <Rotate3D size={48} className="text-white mb-4 mx-auto animate-pulse" />
                    <p className="text-white text-[10px] font-black uppercase tracking-[.3em]">Interactive Panorama Rendering</p>
                 </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-transparent to-transparent pointer-events-none"></div>
      </div>

      {/* Media Selector Tabs */}
      <div className="absolute top-8 left-8 flex gap-2 z-20">
         <button 
           onClick={() => onTabChange("photo")}
           className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === "photo" ? "bg-brand-accent text-white" : "bg-white/20 backdrop-blur-md text-white hover:bg-white/40"}`}
         >
           <Camera size={14} /> Gallery
         </button>
         {property.details.videoUrl && (
           <button 
             onClick={() => onTabChange("video")}
             className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === "video" ? "bg-brand-accent text-white" : "bg-white/20 backdrop-blur-md text-white hover:bg-white/40"}`}
           >
             <Video size={14} /> Drone Tour
           </button>
         )}
         {property.details.panoramaUrl && (
           <button 
             onClick={() => onTabChange("360")}
             className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest flex items-center gap-2 transition-all ${activeTab === "360" ? "bg-brand-accent text-white" : "bg-white/20 backdrop-blur-md text-white hover:bg-white/40"}`}
           >
             <Rotate3D size={14} /> 360° View
           </button>
         )}
      </div>

      <div className="absolute bottom-8 left-8 z-20">
        <span className="bg-brand-accent text-white text-[10px] font-black uppercase px-2 py-1 tracking-widest shadow-lg">Verified Asset</span>
        <h3 className="font-serif text-3xl italic text-white mt-4">{property.area}</h3>
      </div>
    </div>
  );
};

const PropertyModal = ({ isOpen, onClose, property }: { isOpen: boolean, onClose: () => void, property: any }) => {
  const [activeTab, setActiveTab] = useState("photo");

  useEffect(() => {
    if (isOpen) setActiveTab("photo");
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-brand-primary/60 backdrop-blur-md"
          ></motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="bg-white w-full max-w-5xl max-h-[90vh] overflow-hidden relative z-10 flex flex-col md:flex-row group"
          >
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-20 bg-white/20 backdrop-blur-md text-white p-2 rounded-full hover:bg-white hover:text-brand-primary transition-all md:text-brand-primary md:bg-brand-bg md:border md:border-brand-border"
            >
              <X size={20} />
            </button>

            <div className="md:w-1/2 min-h-[300px] md:min-h-0 bg-gray-900 border-r border-brand-border">
              <VirtualMediaViewer 
                property={property} 
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
              />
            </div>

            <div className="md:w-1/2 p-8 md:p-12 overflow-y-auto bg-white">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h4 className="text-[10px] uppercase tracking-[.3em] text-brand-accent font-black mb-2">{property.location}</h4>
                  <p className="text-3xl font-bold text-brand-primary">{property.price}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-10 pb-8 border-b border-brand-border">
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Land Size</span>
                  <div className="flex items-center gap-2 text-brand-primary font-bold">
                    <Landmark size={14} className="text-brand-accent" /> {property.details.sqft}
                  </div>
                </div>
                <div>
                  <span className="text-[9px] uppercase tracking-widest text-gray-400 font-bold block mb-1">Topography</span>
                  <div className="flex items-center gap-2 text-brand-primary font-bold">
                    <Home size={14} className="text-brand-accent" /> Flat / Dry
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <h5 className="text-[10px] uppercase tracking-widest text-brand-primary font-black mb-4">Description</h5>
                <p className="text-gray-600 text-sm leading-relaxed italic">
                  {property.details.description}
                </p>
              </div>

              <div className="mb-10">
                <h5 className="text-[10px] uppercase tracking-widest text-brand-primary font-black mb-4">Key Features</h5>
                <div className="grid grid-cols-1 gap-3">
                  {property.details.features.map((feature: string, i: number) => (
                    <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                      <CheckCircle size={14} className="text-brand-accent" /> {feature}
                    </div>
                  ))}
                </div>
              </div>

              <a 
                href={WHATSAPP_LINK} 
                className="w-full bg-brand-whatsapp text-white py-5 flex items-center justify-center gap-3 rounded-full font-bold text-sm hover:scale-[1.02] transition-transform shadow-xl"
              >
                <MessageCircle size={20} /> Inquire about this plot
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

const PropertySearch = () => {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [priceRange, setPriceRange] = useState("");

  return (
    <div className="relative z-30 -mt-24 px-4 md:px-0 max-w-5xl mx-auto w-full mb-16">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white rounded-xl shadow-xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-4 border border-brand-border"
      >
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
          {/* Location */}
          <div className="w-full">
            <label className="text-xs font-bold text-brand-primary/60 uppercase tracking-wider mb-2 block pl-1">Location</label>
            <div className="relative bg-[#f4f7f6] rounded-md transition-all focus-within:ring-2 focus-within:ring-brand-accent/30 border border-transparent hover:border-brand-border">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-accent pointer-events-none" />
              <select className="appearance-none bg-transparent w-full py-3.5 pl-12 pr-4 text-[15px] font-semibold text-brand-primary focus:outline-none cursor-pointer">
                <option>All Locations</option>
                {locations.map(loc => <option key={loc}>{loc}</option>)}
              </select>
            </div>
          </div>

          {/* Type */}
          <div className="w-full">
             <label className="text-xs font-bold text-brand-primary/60 uppercase tracking-wider mb-2 block pl-1">Property Type</label>
             <div className="relative bg-[#f4f7f6] rounded-md transition-all focus-within:ring-2 focus-within:ring-brand-accent/30 border border-transparent hover:border-brand-border">
              <Home size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-accent pointer-events-none" />
              <select className="appearance-none bg-transparent w-full py-3.5 pl-12 pr-4 text-[15px] font-semibold text-brand-primary focus:outline-none cursor-pointer">
                <option>All Types</option>
                {propertyTypes.map(type => <option key={type}>{type}</option>)}
              </select>
            </div>
          </div>

          {/* Budget */}
          <div className="w-full">
             <label className="text-xs font-bold text-brand-primary/60 uppercase tracking-wider mb-2 block pl-1">Budget</label>
             <div className="relative bg-[#f4f7f6] rounded-md transition-all focus-within:ring-2 focus-within:ring-brand-accent/30 border border-transparent hover:border-brand-border">
              <SlidersHorizontal size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-accent pointer-events-none" />
              <select className="appearance-none bg-transparent w-full py-3.5 pl-12 pr-4 text-[15px] font-semibold text-brand-primary focus:outline-none cursor-pointer">
                <option>Any Budget</option>
                <option>Under ₦5M</option>
                <option>₦5M - ₦10M</option>
                <option>₦10M - ₦25M</option>
                <option>₦25M+</option>
              </select>
            </div>
          </div>
        </div>

        <button className="w-full md:w-auto mt-7 md:mt-7 bg-brand-accent text-white px-8 py-3.5 rounded-md font-bold flex items-center justify-center gap-2 hover:bg-[#20A960] transition-colors shadow-lg">
          Search
        </button>
      </motion.div>
    </div>
  );
};

const testimonials = [
  {
    name: "Engr. Adeyemi",
    role: "Lagos-based Civil Engineer",
    text: "I was worried about buying land from Lagos, but Samfall made the process transparent. My C of O at Oda Road was handled professionally and delivered exactly on time.",
    location: "Bought at Oda Road",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    posterUrl: "https://picsum.photos/seed/yemi/800/800"
  },
  {
    name: "Prof. Mrs. Bankole",
    role: "University Lecturer",
    text: "As an academic, I value precision and verification. Samfall's survey process is unmatched in Akure. I secured two plots near the university without a single omo-onile issue.",
    location: "Invested near FUTA/Ilesha Rd",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    posterUrl: "https://picsum.photos/seed/bankole/800/800"
  },
  {
    name: "Tunde O.",
    role: "Architect (UK Diaspora)",
    text: "Investing back home in Ondo State used to be a nightmare of rumors and scams. Samfall provided live drone footage and Ministry-verified paperwork for my Alagbaka acquisition.",
    location: "Alagbaka Extension",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    posterUrl: "https://picsum.photos/seed/tunde/800/800"
  }
];

const TestimonialCard = ({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-brand-border overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300">
      <div className="relative aspect-video bg-gray-100 group cursor-pointer" onClick={toggleMute}>
        <video 
           ref={videoRef}
           src={testimonial.videoUrl}
           poster={testimonial.posterUrl}
           autoPlay 
           loop 
           muted 
           playsInline
           className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
           <button className="bg-brand-accent text-white p-4 rounded-full shadow-lg transform scale-90 group-hover:scale-100 transition-all">
             {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
           </button>
        </div>
        {isMuted && (
           <div className="absolute top-4 left-4 bg-[#152230]/80 backdrop-blur-sm text-white px-3 py-1.5 text-xs font-bold rounded-md flex items-center gap-2">
             <PlayCircle size={14} className="text-brand-accent"/> Click to Unmute
           </div>
        )}
      </div>
      <div className="p-6 md:p-8 flex-1 flex flex-col">
         <Quote size={32} className="text-brand-accent/20 mb-4 transform -scale-x-100" />
         <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-6 italic">"{testimonial.text}"</p>
         <div className="mt-auto border-t border-brand-border pt-4">
            <p className="font-bold text-brand-primary text-lg">{testimonial.name}</p>
            <p className="text-brand-accent text-sm font-semibold">{testimonial.role}</p>
            <p className="text-gray-400 text-xs mt-1 flex items-center gap-1"><MapPin size={12}/> {testimonial.location}</p>
         </div>
      </div>
    </div>
  );
};

const TestimonialSection = () => {
  return (
    <section className="bg-white py-24 px-6 md:px-12 border-t border-brand-border">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-brand-accent font-bold text-sm uppercase tracking-wider mb-2">Verified Success</p>
          <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">Voices of our Global Partners</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {testimonials.map((t, i) => <TestimonialCard key={i} testimonial={t} />)}
        </div>
      </div>
    </section>
  );
};

const Nav = ({ onOpenScheduler }: { onOpenScheduler: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="absolute top-0 w-full z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-brand-border px-6 md:px-12 py-4 flex justify-between items-center transition-all">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-brand-accent flex items-center justify-center rounded-lg text-white font-bold">
          <Home size={24} />
        </div>
        <div className="hidden sm:block">
          <h1 className="text-xl font-bold text-brand-primary leading-none tracking-tight">{APP_NAME}</h1>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-8 text-[15px] font-semibold text-[#424d5c]">
        <a href="#" className="text-brand-accent transition-colors">Home</a>
        <a href="#listings" className="hover:text-brand-accent transition-colors">Properties</a>
        <a href="#process" className="hover:text-brand-accent transition-colors">Verification</a>
        <a href="#contact" className="hover:text-brand-accent transition-colors">Contact</a>
      </div>

      <div className="flex items-center gap-4">
        <button 
          onClick={onOpenScheduler}
          className="hidden md:flex items-center justify-center bg-brand-accent text-white px-6 py-2.5 rounded-full font-bold shadow-lg hover:shadow-xl hover:bg-[#20A960] transition-all"
        >
          Book Inspection
        </button>
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-brand-primary p-2">
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-brand-border flex flex-col p-6 gap-4 lg:hidden shadow-xl"
          >
            <a href="#" className="font-semibold text-brand-primary hover:text-brand-accent">Home</a>
            <a href="#listings" className="font-semibold text-brand-primary hover:text-brand-accent">Properties</a>
            <a href="#process" className="font-semibold text-brand-primary hover:text-brand-accent">Verification</a>
            <a href="#contact" className="font-semibold text-brand-primary hover:text-brand-accent">Contact</a>
            <button 
              onClick={() => { onOpenScheduler(); setIsOpen(false); }}
              className="bg-brand-accent text-white py-3 rounded-md font-bold mt-2"
            >
              Book Inspection
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = ({ onOpenScheduler }: { onOpenScheduler: () => void }) => {
  return (
    <section className="relative h-[90vh] min-h-[600px] flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Image full width */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://picsum.photos/seed/estatehub-hero/1920/1080" 
          alt="Hero Estate" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-[#152230]/60 mix-blend-multiply"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-12 pb-24">
        <motion.h1 
          className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Find Your Dream <br className="hidden md:block"/> Property in Akure
        </motion.h1>
        <motion.p 
          className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl mx-auto font-medium"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          Discover verified lands, residential homes, and commercial spaces with ease.
        </motion.p>
      </div>
    </section>
  );
};

const TrustBar = () => {
  const items = [
    { icon: <ShieldCheck size={28} />, title: "Ministry Vetted", desc: "No shadow ownership" },
    { icon: <CheckCircle size={28} />, title: "Instant Allocation", desc: "Zero land disputes" },
    { icon: <MapPin size={28} />, title: "Growth Hubs", desc: "Prime Alagbaka & Oda" },
    { icon: <Users size={28} />, title: "Diaspora Ready", desc: "Global trust verified" },
  ];

  return (
    <div className="bg-[#152230] py-16 px-6 md:px-12 flex flex-wrap justify-center md:justify-between items-start gap-12 gap-y-16">
      {items.map((item, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col md:flex-row gap-4 items-center md:items-start text-center md:text-left basis-full sm:basis-auto"
        >
          <div className="text-brand-accent p-3 bg-brand-accent/10 rounded-xl shrink-0">
            {item.icon}
          </div>
          <div>
            <h4 className="text-white text-lg font-bold mb-1">{item.title}</h4>
            <p className="text-white/60 text-sm">{item.desc}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

const PropertyCard = ({ price, area, location, img, details }: { price: string, area: string, location: string, img: string, details: PropertyDetails }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <motion.div 
        whileHover={{ y: -8 }}
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-white rounded-xl shadow-lg border border-brand-border overflow-hidden group flex flex-col h-full transition-all duration-300"
      >
        <div className="relative aspect-[4/3] overflow-hidden bg-gray-100 cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <img 
            src={img} 
            alt={area} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
            referrerPolicy="no-referrer" 
          />
          
          <div className="absolute top-4 left-4">
            <span className="bg-brand-accent text-white font-bold text-xs px-3 py-1.5 rounded shadow-md">
              Verified
            </span>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
             <h3 className="text-white font-bold text-lg leading-tight mb-1">{area}</h3>
             <p className="text-white/80 text-sm flex items-center gap-1">
               <MapPin size={14} /> {location}
             </p>
          </div>
        </div>

        <div className="p-6 flex-1 flex flex-col bg-white">
          <p className="text-brand-accent text-2xl font-bold mb-4">{price}</p>
          
          <div className="flex-1 text-gray-500 text-sm mb-6 line-clamp-3">
             {details.description}
          </div>
          
          <div className="mt-auto flex items-center justify-between border-t border-brand-border pt-4 text-sm font-semibold text-gray-600">
             <span className="flex items-center gap-2">
               <Landmark size={16} className="text-brand-accent" /> {details.sqft}
             </span>
             <span className="flex items-center gap-2">
               <Home size={16} className="text-brand-accent" /> {details.type}
             </span>
          </div>
          <button 
             onClick={() => setIsModalOpen(true)}
             className="w-full mt-6 bg-[#f4f7f6] text-brand-primary py-3 rounded-md font-bold hover:bg-brand-accent hover:text-white transition-colors"
          >
             View Details
          </button>
        </div>
      </motion.div>

      <PropertyModal 
        isOpen={isModalOpen}  
        onClose={() => setIsModalOpen(false)} 
        property={{ price, area, location, img, details }} 
      />
    </>
  );
};

const App = () => {
  const [isSchedulerOpen, setIsSchedulerOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col selection-gold overflow-x-hidden text-[#1A1A1A]">
      <RecentAcquisitionTicker />
      <Nav onOpenScheduler={() => setIsSchedulerOpen(true)} />
      
      <main className="flex-1">
        <Hero onOpenScheduler={() => setIsSchedulerOpen(true)} />
        
        <PropertySearch />
        
        <TrustBar />

        {/* Listings Section */}
        <section id="listings" className="px-6 md:px-12 py-24 bg-[#f8f9fa]">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <p className="text-brand-accent font-bold text-sm uppercase tracking-wider mb-2">Our Properties</p>
              <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">Discover Hand-Picked Opportunities in Akure</h2>
            </div>
            <button className="text-sm font-bold text-brand-primary hover:text-brand-accent transition-colors flex items-center gap-1 group">
              Browse All Listings <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PropertyCard 
              location="Alagbaka Ext."
              area="The Sanctuary Plots"
              price="₦12,500,000"
              img="https://picsum.photos/seed/akure-1/800/600"
              details={{
                sqft: "648sqm",
                type: "Residential",
                description: "A premium corner piece plot located in the safest high-growth zone of Alagbaka. Perfect for high-end residential development with existing tarred road access and central drainage.",
                features: ["Perimeter Fencing", "Security Gatehouse Access", "Swift C of O Processing", "Prime Neighborhood"],
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with real drone tour
                panoramaUrl: "https://picsum.photos/seed/view360-1/1600/900"
              }}
            />
            <PropertyCard 
              location="Oda Road"
              area="Emerald Hills Estate"
              price="₦3,500,000"
              img="https://picsum.photos/seed/akure-2/800/600"
              details={{
                sqft: "500sqm",
                type: "Estate Plot",
                description: "Positioned along the promising Oda Road development axis. This estate plot offers a perfect balance of tranquility and investment potential, with 15% appreciation quarterly.",
                features: ["Dry Level Ground", "Planned Power Grid", "Green Areas Nearby", "Flexible Payment Plans"],
                videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
              }}
            />
            <PropertyCard 
              location="Off FUTA Road"
              area="Stellar Heights"
              price="₦5,800,000"
              img="https://picsum.photos/seed/akure-3/800/600"
              details={{
                sqft: "600sqm",
                type: "Commercial/Res",
                description: "Strategic location off the FUTA/Ilesha road. Ideal for student housing investments or a modern private residence surrounded by lush greenery and academic atmosphere.",
                features: ["Global C of O Search Done", "Proximity to University", "Gated Community", "Instant Physical Allocation"],
                panoramaUrl: "https://picsum.photos/seed/view360-3/1600/900"
              }}
            />
          </div>
        </section>

        {/* Verification Section */}
        <section className="px-6 md:px-12 py-24 bg-white relative overflow-hidden text-[#152230]">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-16">
              <div className="lg:w-1/2">
                <div className="mb-10">
                   <p className="text-brand-accent font-bold text-sm uppercase tracking-wider mb-2">The Ironclad Protocol</p>
                   <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                      The Samfall Shield Strategy
                   </h2>
                   <p className="text-gray-500 text-lg">We guarantee 100% peace of mind on every property purchase.</p>
                </div>
                
                <div className="space-y-8">
                   {[
                     {
                       icon: <FileSearch size={22} />,
                       title: "Ministry-Level Vetting",
                       desc: "Direct verification of C of O and Governor's Consent with the Ondo State Ministry of Lands central registry."
                     },
                     {
                       icon: <Compass size={22} />,
                       title: "Precision Survey Audit",
                       desc: "Cross-referencing coordinates with the government master plan to ensure zero encroachment on future roads."
                     },
                     {
                       icon: <Fingerprint size={22} />,
                       title: "Legacy Dispute Clearance",
                       desc: "Multi-point investigation with local stakeholders to neutralize any potential 'Omo-Onile' history."
                     }
                   ].map((item, i) => (
                     <motion.div 
                       key={i}
                       initial={{ opacity: 0, x: -30 }}
                       whileInView={{ opacity: 1, x: 0 }}
                       viewport={{ once: true }}
                       transition={{ delay: i * 0.2 }}
                       className="flex gap-6 group"
                     >
                       <div className="w-14 h-14 shrink-0 bg-[#f4f7f6] rounded-xl flex items-center justify-center text-brand-accent transform group-hover:-translate-y-1 transition-transform duration-300">
                         {item.icon}
                       </div>
                       <div>
                         <h4 className="text-lg font-bold text-brand-primary mb-1">{item.title}</h4>
                         <p className="text-gray-500 text-sm leading-relaxed max-w-sm">{item.desc}</p>
                       </div>
                     </motion.div>
                   ))}
                </div>
              </div>

              <div className="lg:w-1/2 relative group w-full">
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.95 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="relative aspect-[4/5] md:aspect-square overflow-hidden rounded-2xl shadow-xl"
                 >
                    <img 
                      src="https://picsum.photos/seed/verification-akure/1200/1500" 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                      alt="Verified Ministry Land"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#152230]/90 to-transparent"></div>
                    
                    <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
                       <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 text-white">
                          <p className="text-brand-accent font-bold text-xs uppercase tracking-wider mb-2">Guaranteed Security</p>
                          <h3 className="text-2xl font-bold mb-6">Direct Access to Ministry Data</h3>
                          <div className="flex gap-8">
                             <div>
                                <p className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-1">State</p>
                                <p className="text-lg font-bold">Ondo</p>
                             </div>
                             <div>
                                <p className="text-brand-accent text-xs font-bold uppercase tracking-wider mb-1">Status</p>
                                <p className="text-lg font-bold">Verified</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </motion.div>
                 
                 <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="absolute -top-6 -right-6 bg-white p-6 rounded-xl border border-brand-border hidden xl:block shadow-2xl max-w-[240px]"
                 >
                    <ShieldCheck className="text-brand-accent mb-3" size={28} />
                    <p className="text-sm font-bold text-brand-primary mb-2">Lawful Compliance</p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                       Every Samfall plot is pre-vetted against the state regional masterplan to prevent future encroachment issues.
                    </p>
                 </motion.div>
              </div>
            </div>
          </div>
        </section>

        <TestimonialSection />

        {/* Process Section */}
        <section className="px-6 md:px-12 py-24 bg-[#f4f7f6] border-t border-brand-border">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <p className="text-brand-accent font-bold text-sm uppercase tracking-wider mb-2">The Samfall Way</p>
            <h2 className="text-3xl md:text-4xl font-bold text-brand-primary">A Seamless Client Journey</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative max-w-6xl mx-auto">
            <div className="absolute top-[4.5rem] left-0 w-full h-[2px] bg-brand-border hidden md:block z-0"></div>
            {[
              { num: "01", title: "Select", desc: "Curated, pre-vetted Akure collections tailored to your legacy goals." },
              { num: "02", title: "Inspect", desc: "Private, expert-led site visits. Experience the terrain before you commit." },
              { num: "03", title: "Secure", desc: "Instant physical allocation & Ministry-backed documentation. Pure security." },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative z-10 transition-transform hover:-translate-y-2 group">
                <div className="w-24 h-24 bg-white border-4 border-brand-border group-hover:border-brand-accent shadow-md rounded-full flex items-center justify-center text-brand-primary font-bold text-3xl mb-6 transition-colors">
                  {step.num}
                </div>
                <h3 className="font-bold text-2xl text-brand-primary mb-4">{step.title}</h3>
                <p className="text-gray-500 font-medium text-base leading-relaxed px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section id="contact" className="px-6 md:px-12 py-24 bg-white">
          <div className="bg-[#152230] rounded-2xl p-10 md:p-20 text-center relative overflow-hidden shadow-2xl">
             <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/lux-akure/1920/1080')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
             <div className="relative z-10 flex flex-col items-center">
               <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                 Secure Your Next <br />
                 <span className="text-brand-accent">Legacy Asset</span>
               </h2>
               <p className="text-white/80 text-lg mb-12 max-w-xl">
                 Don't wait for the market to move. Secure high-growth Akure land with Ministry-backed verification today.
               </p>
               <div className="flex flex-col md:flex-row gap-6 w-full md:w-auto">
                 <button 
                  onClick={() => setIsSchedulerOpen(true)}
                  className="bg-brand-accent text-white px-10 py-5 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-[#20A960] transition-colors shadow-lg">
                   Book Consultation
                 </button>
                 <a 
                   href={WHATSAPP_LINK}
                   className="bg-white/10 border border-white/20 text-white px-10 py-5 rounded-md font-bold text-sm uppercase tracking-wider hover:bg-white/20 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                 >
                   <MessageCircle size={18} /> WhatsApp
                 </a>
               </div>
             </div>
             <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-brand-accent opacity-10 rounded-full blur-[100px]"></div>
          </div>
        </section>
      </main>

      <footer className="bg-[#152230] border-t border-white/5 pt-20 pb-12 px-6 md:px-12 text-white">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-1 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-brand-accent flex items-center justify-center rounded-lg font-bold text-white">
                <Home size={24} />
              </div>
              <h1 className="text-xl font-bold tracking-tight leading-none">{APP_NAME}</h1>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mt-2">
              Legacy Estate Consulting • Akure, Ondo State. Nigeria.
            </p>
          </div>
          
          <div>
            <h4 className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-6">Access Collection</h4>
            <ul className="text-white/70 text-sm space-y-4 font-medium">
              <li><a href="#listings" className="hover:text-brand-accent transition-colors">Vetted Listings</a></li>
              <li><button onClick={() => setIsSchedulerOpen(true)} className="hover:text-brand-accent transition-colors">Schedule Visit</button></li>
              <li><a href="#process" className="hover:text-brand-accent transition-colors">The Shield Protocol</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Investor Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-6">Direct Contact</h4>
            <ul className="text-white/70 text-sm space-y-4 font-medium">
              <li className="flex items-center gap-3 group transition-colors hover:text-brand-accent"><Phone size={16} className="text-brand-accent" /> +234 800 000 0000</li>
              <li className="flex items-center gap-3 group transition-colors hover:text-brand-accent"><MessageCircle size={16} className="text-brand-accent" /> <a href={WHATSAPP_LINK}>Official WhatsApp</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-accent text-sm font-bold uppercase tracking-wider mb-6">Search Index</h4>
            <div className="flex bg-white/5 border border-white/10 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-brand-accent/30 transition-all">
              <input 
                type="text" 
                placeholder="Search zones..." 
                className="bg-transparent text-sm p-4 flex-1 focus:outline-none text-white"
              />
              <button className="bg-brand-accent text-white px-6 hover:bg-[#20A960] transition-colors flex items-center">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
          <p className="text-white/50 text-sm">
            © {new Date().getFullYear()} {APP_NAME} Estate Consultant. All Rights Reserved.
          </p>
          <div className="flex gap-8 text-sm font-medium text-white/50">
            <span className="hover:text-brand-accent cursor-pointer transition-colors">Instagram</span>
            <span className="hover:text-brand-accent cursor-pointer transition-colors">LinkedIn</span>
            <span className="hover:text-brand-accent cursor-pointer transition-colors">Twitter</span>
          </div>
        </div>
      </footer>

      {/* Floating CTA for Mobile */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <a 
          href={WHATSAPP_LINK}
          className="w-16 h-16 bg-brand-whatsapp text-white rounded-full flex items-center justify-center shadow-2xl"
        >
          <MessageCircle size={24} />
        </a>
      </div>

      <SchedulerModal 
        isOpen={isSchedulerOpen} 
        onClose={() => setIsSchedulerOpen(false)} 
      />
    </div>
  );
};

export default App;
