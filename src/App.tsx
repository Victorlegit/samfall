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

const APP_NAME = "Samfall";
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
    <div className="relative z-30 -mt-12 px-6 md:px-12 max-w-5xl mx-auto">
      <motion.div 
        initial={{ y: 20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        className="bg-white/90 backdrop-blur-3xl border border-white/40 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] p-2 md:p-3 flex flex-col md:flex-row items-stretch gap-2 transition-all hover:bg-white"
      >
        <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-2">
          {/* Location */}
          <div className="group relative flex items-center px-6 py-4 border border-transparent hover:border-brand-accent/20 transition-all rounded-xs">
            <MapPin size={18} className="text-brand-accent mr-4 shrink-0 transition-transform group-hover:scale-110" />
            <div className="flex-1">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-accent mb-1 leading-none">Market Zone</p>
              <select className="appearance-none bg-transparent w-full text-xs font-bold text-brand-primary focus:outline-none cursor-pointer uppercase tracking-widest">
                <option>All of Akure</option>
                {locations.map(loc => <option key={loc}>{loc}</option>)}
              </select>
            </div>
          </div>

          <div className="hidden md:block w-px h-8 bg-brand-border self-center"></div>

          {/* Type */}
          <div className="group relative flex items-center px-6 py-4 border border-transparent hover:border-brand-accent/20 transition-all rounded-xs">
            <Home size={18} className="text-brand-accent mr-4 shrink-0 transition-transform group-hover:scale-110" />
            <div className="flex-1">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-accent mb-1 leading-none">Asset Category</p>
              <select className="appearance-none bg-transparent w-full text-xs font-bold text-brand-primary focus:outline-none cursor-pointer uppercase tracking-widest">
                <option>All Types</option>
                {propertyTypes.map(type => <option key={type}>{type}</option>)}
              </select>
            </div>
          </div>

          <div className="hidden md:block w-px h-8 bg-brand-border self-center"></div>

          {/* Budget */}
          <div className="group relative flex items-center px-6 py-4 border border-transparent hover:border-brand-accent/20 transition-all rounded-xs">
            <SlidersHorizontal size={18} className="text-brand-accent mr-4 shrink-0 transition-transform group-hover:scale-110" />
            <div className="flex-1">
              <p className="text-[8px] font-black uppercase tracking-[0.2em] text-brand-accent mb-1 leading-none">Pricing Ceiling</p>
              <select className="appearance-none bg-transparent w-full text-xs font-bold text-brand-primary focus:outline-none cursor-pointer uppercase tracking-widest">
                <option>Any Budget</option>
                <option>Under ₦5M</option>
                <option>₦5M - ₦10M</option>
                <option>₦10M - ₦25M</option>
                <option>₦25M+</option>
              </select>
            </div>
          </div>
        </div>

        <button className="bg-brand-primary text-brand-accent px-10 py-5 md:py-0 flex items-center justify-center gap-3 group/search transition-all hover:brightness-110">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Filter Assets</span>
          <ArrowRight size={16} className="group-hover/search:translate-x-2 transition-transform" />
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
    posterUrl: "https://picsum.photos/seed/yemi/800/1000"
  },
  {
    name: "Prof. Mrs. Bankole",
    role: "University Lecturer (FUTA)",
    text: "As an academic, I value precision and verification. Samfall's survey process is unmatched in Akure. I secured two plots near the university without a single omo-onile issue.",
    location: "Invested near FUTA/Ilesha Rd",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    posterUrl: "https://picsum.photos/seed/bankole/800/1000"
  },
  {
    name: "Tunde O.",
    role: "Architect (UK Diaspora)",
    text: "Investing back home in Ondo State used to be a nightmare of rumors and scams. Samfall provided live drone footage and Ministry-verified paperwork for my Alagbaka acquisition.",
    location: "Alagbaka Extension",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    posterUrl: "https://picsum.photos/seed/tunde/800/1000"
  }
];

const TestimonialSlider = () => {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isPaused || (!isMuted)) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [isPaused, isMuted]);

  useEffect(() => {
    setIsMuted(true);
  }, [current]);

  const toggleMute = () => {
     if (videoRef.current) {
         videoRef.current.muted = !videoRef.current.muted;
         setIsMuted(videoRef.current.muted);
     }
  };

  const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
  const prev = () => setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="bg-brand-bg py-32 px-6 md:px-12 relative overflow-hidden" onMouseEnter={() => setIsPaused(true)} onMouseLeave={() => setIsPaused(false)}>
      <div className="max-w-7xl mx-auto relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        
        {/* Left Side: Video */}
        <div className="w-full lg:w-5/12 relative">
          <AnimatePresence mode="wait">
             <motion.div
               key={current}
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               exit={{ opacity: 0, scale: 1.05 }}
               transition={{ duration: 0.8 }}
               onClick={toggleMute}
               className="relative aspect-[4/5] overflow-hidden shadow-2xl bg-brand-primary cursor-pointer group"
             >
                <video 
                   ref={videoRef}
                   src={testimonials[current].videoUrl}
                   poster={testimonials[current].posterUrl}
                   autoPlay 
                   loop 
                   muted={isMuted} 
                   playsInline
                   className={`w-full h-full object-cover transition-all duration-1000 ${isMuted ? 'grayscale-[0.5] opacity-80 group-hover:scale-105' : 'grayscale-0 opacity-100'}`}
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-black/20 gap-0 z-10 opacity-80"></div>
                
                <div className="absolute bottom-8 left-8 right-8 z-20 flex justify-between items-end">
                   <div>
                     <p className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-accent mb-2">Client Story</p>
                     <h4 className="font-serif text-3xl italic text-white leading-none">{testimonials[current].name}</h4>
                   </div>
                   
                   <button 
                     onClick={(e) => { e.stopPropagation(); toggleMute(); }}
                     className="w-14 h-14 rounded-full bg-brand-accent text-brand-primary flex flex-col items-center justify-center hover:scale-110 transition-transform shadow-lg group relative z-30 cursor-pointer"
                   >
                     {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                   </button>
                </div>
                
                {isMuted && (
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                     <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-6 py-3 flex items-center gap-3 rounded-full shadow-[0_0_40px_rgba(212,175,55,0.2)]">
                        <PlayCircle size={16} className="text-brand-accent animate-pulse" /> 
                        <span className="uppercase tracking-[0.2em] text-[10px] font-black">Watch Story</span>
                     </div>
                  </div>
                )}
             </motion.div>
          </AnimatePresence>
          
          <div className="absolute -z-10 -bottom-8 -left-8 w-[200px] h-[200px] bg-brand-accent opacity-20 blur-3xl"></div>
        </div>
        
        {/* Right Side: Text */}
        <div className="w-full lg:w-7/12 relative">
          <div className="mb-12">
             <Quote size={48} className="text-brand-accent/30 mb-8 transform -scale-x-100" />
             <h2 className="font-serif text-5xl md:text-6xl text-brand-primary leading-[1.1] italic">
               Voices of our <br />
               <span className="font-bold not-italic">Global Partners.</span>
             </h2>
          </div>
        
          <div className="min-h-[200px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <p className="text-xl md:text-2xl text-gray-600 italic font-medium leading-[1.8] mb-10">
                  "{testimonials[current].text}"
                </p>
                <div className="flex flex-col">
                  <p className="text-brand-primary text-[11px] font-black uppercase tracking-[0.3em] mb-3">{testimonials[current].role}</p>
                  <div className="inline-flex items-center gap-2 border border-brand-border px-4 py-2 self-start rounded-xs bg-white text-gray-500 shadow-sm">
                    <MapPin size={12} className="text-brand-accent" />
                    <span className="text-[9px] font-bold uppercase tracking-widest">{testimonials[current].location}</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="flex items-center gap-6 mt-16 pt-8 border-t border-brand-border">
            <button onClick={prev} className="w-12 h-12 border border-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-brand-accent transition-all">
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-4">
              {testimonials.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => setCurrent(i)}
                  className={`h-1.5 transition-all duration-500 rounded-full ${current === i ? "w-10 bg-brand-accent" : "w-3 bg-brand-border hover:bg-brand-primary/30"}`}
                />
              ))}
            </div>
            <button onClick={next} className="w-12 h-12 border border-brand-primary/20 rounded-full flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-brand-accent transition-all">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

const Nav = ({ onOpenScheduler }: { onOpenScheduler: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-xl border-b border-brand-border px-8 md:px-16 py-5 flex justify-between items-center transition-all">
      <div className="flex items-center gap-4">
        <div className="w-11 h-11 bg-brand-primary flex items-center justify-center rounded-xs overflow-hidden transform hover:rotate-3 transition-transform">
          <span className="text-brand-accent font-serif text-2xl font-black italic">S</span>
        </div>
        <div className="hidden sm:block">
          <h1 className="text-sm font-black tracking-[0.2em] uppercase leading-none text-brand-primary">{APP_NAME}</h1>
          <p className="text-[8px] tracking-[0.4em] uppercase text-brand-accent mt-1.5 font-bold">Estate Consultant</p>
        </div>
      </div>

      <div className="hidden lg:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.2em] text-brand-primary/60">
        <a href="#" className="text-brand-primary relative group">
          Introduction
          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-accent origin-left scale-x-100 transition-transform"></span>
        </a>
        <a href="#listings" className="hover:text-brand-primary transition-colors relative group">
          Collection
          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        </a>
        <a href="#process" className="hover:text-brand-primary transition-colors relative group">
          The Shield
          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        </a>
        <a href="#contact" className="hover:text-brand-primary transition-colors relative group">
          Contact
          <span className="absolute -bottom-1 left-0 w-full h-[2px] bg-brand-accent origin-left scale-x-0 group-hover:scale-x-100 transition-transform"></span>
        </a>
      </div>

      <div className="flex items-center gap-6">
        <button 
          onClick={onOpenScheduler}
          className="hidden md:block group relative px-8 py-3.5 overflow-hidden border border-brand-primary"
        >
          <span className="relative z-10 text-[10px] font-black uppercase tracking-[0.25em] text-brand-primary group-hover:text-white transition-colors">Book Inspection</span>
          <div className="absolute inset-0 bg-brand-primary translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
        </button>
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-brand-primary p-2">
          {isOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-brand-border flex flex-col p-8 gap-6 lg:hidden shadow-2xl"
          >
            <a href="#" className="font-black text-sm uppercase tracking-widest text-brand-primary">Introduction</a>
            <a href="#listings" className="font-black text-sm uppercase tracking-widest text-brand-primary">Collection</a>
            <a href="#process" className="font-black text-sm uppercase tracking-widest text-brand-primary">The Shield</a>
            <a href="#contact" className="font-black text-sm uppercase tracking-widest text-brand-primary">Contact</a>
            <button 
              onClick={() => { onOpenScheduler(); setIsOpen(false); }}
              className="bg-brand-primary text-brand-accent py-5 text-sm font-black uppercase tracking-widest mt-4"
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
    <section className="relative min-h-[90vh] flex flex-col overflow-hidden bg-brand-bg">
      <div className="flex-1 flex flex-col lg:flex-row items-stretch">
        {/* Left Side: Content */}
        <div className="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center relative z-10 bg-brand-bg">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-4 mb-10 overflow-hidden">
              <span className="w-16 h-[1px] bg-brand-accent"></span>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">A Legacy Vetted by Experts</span>
            </div>
            
            <h2 className="font-serif text-6xl md:text-8xl leading-[0.95] font-light mb-12 relative">
              Secure the <br />
              <span className="italic font-bold text-brand-primary">Golden Acre</span> <br />
              of Akure.
            </h2>
            
            <p className="text-gray-500 text-lg md:text-xl leading-relaxed max-w-lg mb-16 font-medium italic">
              Experience a new tier of real estate consultancy. We offer pre-verified, high-yield land assets for investors who value security above all.
            </p>

            <div className="flex flex-col sm:flex-row gap-8">
              <button 
                onClick={onOpenScheduler}
                className="bg-brand-primary text-brand-accent px-10 py-6 text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-transform group"
              >
                Inquire & Book Inspection
              </button>
              <div className="flex items-center gap-5">
                <div className="flex -space-x-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-brand-bg bg-brand-border overflow-hidden">
                      <img src={`https://i.pravatar.cc/100?img=${i + 20}`} alt="user" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-black text-brand-primary tracking-tighter">500+ INVESTORS</span>
                  <span className="text-[9px] font-bold text-brand-accent uppercase tracking-widest">Global Trust Base</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side: Imagery */}
        <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-0 bg-brand-primary overflow-hidden">
          <motion.div 
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src="https://picsum.photos/seed/akure-luxury-land/1200/1600" 
              className="w-full h-full object-cover opacity-60 mix-blend-luminosity brightness-75" 
              alt="Premium Akure Land"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-bg lg:from-transparent to-transparent z-10 pointer-events-none"></div>
            <div className="absolute inset-0 bg-brand-primary/20 backdrop-grayscale-[0.5]"></div>
          </motion.div>

          {/* Floating Detail Card */}
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="absolute bottom-16 right-16 z-20 bg-white/20 backdrop-blur-2xl p-8 border border-white/20 hidden xl:block min-w-[320px]"
          >
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-[.3em] text-brand-accent mb-2">Featured Hub</p>
                  <h4 className="font-serif text-3xl italic text-white leading-none">Alagbaka Ext.</h4>
                </div>
                <div className="w-12 h-12 bg-brand-accent flex items-center justify-center rounded-full text-brand-primary rotate-12">
                   <ShieldCheck size={28} />
                </div>
              </div>
              <div className="h-px bg-white/20"></div>
              <div className="flex justify-between items-center text-white">
                <div>
                   <p className="text-[9px] font-bold uppercase tracking-widest text-white/50 mb-1">Status</p>
                   <p className="text-xl font-bold italic font-serif">100% Vetted</p>
                </div>
                <div className="text-right">
                   <p className="text-[9px] font-bold uppercase tracking-widest text-white/50 mb-1">Acres Left</p>
                   <p className="text-xl font-bold tracking-tighter">04 Plot(s)</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Scrolling Vertical Rail Text */}
          <div className="absolute top-0 right-8 h-full flex flex-col justify-between py-24 pointer-events-none hidden lg:flex">
             <span className="vertical-text text-[10px] font-black uppercase tracking-[.5em] text-brand-accent/40">Verified Ownership</span>
             <span className="vertical-text text-[10px] font-black uppercase tracking-[.5em] text-brand-accent/40">Ondo State Ministry Vetted</span>
             <span className="vertical-text text-[10px] font-black uppercase tracking-[.5em] text-brand-accent/40">Akure Premium Plots</span>
          </div>
        </div>
      </div>

      {/* Hero Foot: Stat Bar */}
      <div className="bg-white border-t border-brand-border px-8 md:px-16 py-12 hidden lg:flex justify-between items-center relative z-20">
        {[
          { label: "Market Experience", value: "12 Years" },
          { label: "Verified Area", value: "2,400+ Acres" },
          { label: "Investor Base", value: "540 Clients" },
          { label: "Active Districts", value: "05 Zones" }
        ].map((stat, i) => (
          <div key={i} className="flex flex-col gap-2">
            <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">{stat.label}</span>
            <span className="text-2xl font-black text-brand-primary font-serif italic">{stat.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

const TrustBar = () => {
  const items = [
    { icon: <ShieldCheck size={20} />, title: "Ministry Vetted", desc: "No shadow ownership" },
    { icon: <CheckCircle size={20} />, title: "Instant Allocation", desc: "Zero omo-onile issues" },
    { icon: <MapPin size={20} />, title: "Growth Hubs", desc: "Prime Alagbaka & Oda" },
    { icon: <Users size={20} />, title: "Diaspora Ready", desc: "Global trust verified" },
  ];

  return (
    <div className="bg-brand-primary border-y border-white/10 py-12 px-8 md:px-16 flex flex-wrap justify-between gap-12 overflow-hidden relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(212,175,55,0.1),transparent)] pointer-events-none"></div>
      {items.map((item, i) => (
        <motion.div 
          key={i} 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="flex gap-4 items-center relative z-10"
        >
          <div className="text-brand-accent p-2 border border-brand-accent/20 rounded-full shrink-0">
            {item.icon}
          </div>
          <div>
            <h4 className="text-white text-[10px] font-black uppercase tracking-[0.2em]">{item.title}</h4>
            <p className="text-white/40 text-[9px] font-bold uppercase mt-1 tracking-widest">{item.desc}</p>
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
        whileHover={{ y: -12 }}
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="bg-white border border-brand-border group relative overflow-hidden transition-all h-full flex flex-col"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-gray-100">
          <img 
            src={img} 
            alt={area} 
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 grayscale-[0.2] group-hover:grayscale-0" 
            referrerPolicy="no-referrer" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="absolute top-6 left-6 flex flex-col gap-2">
            <span className="bg-brand-primary text-brand-accent font-black text-[8px] uppercase px-3 py-1.5 tracking-widest self-start">
              Verified Asset
            </span>
          </div>

          <div className="absolute bottom-6 left-6 right-6 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
             <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full bg-white text-brand-primary py-4 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-brand-accent hover:text-white transition-colors"
             >
                Explore Details
             </button>
          </div>
        </div>

        <div className="p-8 flex-1 flex flex-col items-center text-center">
          <h3 className="text-[10px] uppercase tracking-[0.3em] text-brand-accent font-black mb-4">{location}</h3>
          <h2 className="font-serif text-2xl italic font-bold text-brand-primary mb-6 line-clamp-2">{area}</h2>
          
          <div className="w-8 h-[1px] bg-brand-border mb-6"></div>

          <div className="flex flex-col gap-1 items-center">
            <p className="text-[9px] uppercase font-bold text-gray-400 tracking-widest">Investment Value</p>
            <p className="text-xl font-black text-brand-primary tracking-tighter">{price}</p>
          </div>
          
          <div className="mt-8 flex gap-6 text-[9px] font-black text-gray-500 uppercase tracking-widest border-t border-brand-border pt-6 w-full justify-center">
             <span className="flex items-center gap-2">
               <Landmark size={14} className="text-brand-accent" /> {details.sqft}
             </span>
             <span className="flex items-center gap-2">
               <Home size={14} className="text-brand-accent" /> {details.type}
             </span>
          </div>
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
        <section id="listings" className="px-6 md:px-12 py-24 bg-white">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <p className="text-brand-accent font-black text-[11px] uppercase tracking-widest mb-4">The Collection</p>
              <h2 className="font-serif text-4xl leading-tight">Hand-Picked Opportunities in <span className="italic">Akure's Gold Zones</span></h2>
            </div>
            <button className="text-[11px] font-black uppercase tracking-widest text-brand-primary border-b-2 border-brand-accent/30 hover:border-brand-accent pb-1 transition-all">
              Browse All Listings
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
        <section className="px-6 md:px-12 py-32 bg-brand-bg relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none flex items-center justify-center">
             <div className="text-[40rem] font-black italic tracking-tighter select-none">V</div>
          </div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-24">
              <div className="lg:w-1/2">
                <div className="inline-flex items-center gap-4 mb-10">
                   <div className="w-10 h-[1px] bg-brand-accent"></div>
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-accent">The Ironclad Protocol</span>
                </div>
                
                <h2 className="font-serif text-5xl md:text-7xl mb-12 leading-[0.95] italic">
                   The Samfall <br />
                   <span className="not-italic font-bold text-brand-primary">Shield Strategy</span>
                </h2>
                
                <div className="space-y-12">
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
                       className="flex gap-8 group"
                     >
                       <div className="w-16 h-16 shrink-0 bg-white border border-brand-border flex items-center justify-center text-brand-accent transform group-hover:rotate-6 group-hover:scale-110 transition-all duration-500 shadow-sm">
                         {item.icon}
                       </div>
                       <div>
                         <h4 className="text-[11px] font-black uppercase tracking-[.25em] text-brand-primary mb-3">0{i+1} — {item.title}</h4>
                         <p className="text-gray-500 text-sm leading-relaxed max-w-sm italic font-medium">{item.desc}</p>
                       </div>
                     </motion.div>
                   ))}
                </div>
              </div>

              <div className="lg:w-1/2 relative group">
                 <motion.div 
                   initial={{ opacity: 0, scale: 0.9 }}
                   whileInView={{ opacity: 1, scale: 1 }}
                   viewport={{ once: true }}
                   className="relative aspect-[4/5] overflow-hidden shadow-2xl"
                 >
                    <img 
                      src="https://picsum.photos/seed/verification-akure/1200/1500" 
                      className="absolute inset-0 w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 transition-all duration-1000 opacity-80" 
                      alt="Verified Ministry Land"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-primary/20 mix-blend-overlay"></div>
                    
                    <div className="absolute inset-0 flex flex-col justify-end p-12">
                       <div className="p-8 bg-white/10 backdrop-blur-3xl border border-white/20">
                          <p className="text-[10px] font-black uppercase tracking-[.5em] text-brand-accent mb-6">Guaranteed Security</p>
                          <h3 className="font-serif text-3xl italic text-white mb-8">Direct Access to <br /> Ministry Data.</h3>
                          <div className="flex gap-12">
                             <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-brand-accent mb-1">State</p>
                                <p className="text-xl font-black text-white italic font-serif">Ondo</p>
                             </div>
                             <div>
                                <p className="text-[9px] font-black uppercase tracking-widest text-brand-accent mb-1">Status</p>
                                <p className="text-xl font-black text-white italic font-serif">Verified</p>
                             </div>
                          </div>
                       </div>
                    </div>
                 </motion.div>
                 
                 <motion.div 
                    initial={{ x: 20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    className="absolute -top-10 -right-10 bg-white p-8 max-w-[240px] border border-brand-border hidden xl:block shadow-2xl"
                 >
                    <ShieldCheck className="text-brand-accent mb-4" size={32} />
                    <p className="text-[10px] font-black uppercase tracking-widest text-brand-primary mb-2">Lawful Compliance</p>
                    <p className="text-[10px] text-gray-500 italic font-medium leading-relaxed">
                       Every Samfall plot is pre-vetted against the state regional masterplan to prevent future encroachment issues.
                    </p>
                 </motion.div>
              </div>
            </div>
          </div>
        </section>

        <TestimonialSlider />

        {/* Process Section */}
        <section className="px-6 md:px-12 py-32 bg-white border-t border-brand-border">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <h2 className="font-serif text-5xl md:text-6xl italic mb-6">A Seamless <span className="not-italic font-bold">Client Journey</span></h2>
            <p className="text-[10px] font-black uppercase text-brand-accent tracking-[.6em]">The Samfall Way</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-20 relative max-w-6xl mx-auto">
            <div className="absolute top-10 left-0 w-full h-[1px] bg-brand-border hidden md:block z-0"></div>
            {[
              { num: "01", title: "Select", desc: "Curated, pre-vetted Akure collections tailored to your legacy goals." },
              { num: "02", title: "Inspect", desc: "Private, expert-led site visits. Experience the terrain before you commit." },
              { num: "03", title: "Secure", desc: "Instant physical allocation & Ministry-backed documentation. Pure security." },
            ].map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center relative z-10 transition-transform hover:-translate-y-2">
                <div className="w-20 h-20 bg-brand-bg border-4 border-white shadow-xl rounded-full flex items-center justify-center text-brand-primary font-serif italic text-3xl mb-8">
                  {step.num}
                </div>
                <h3 className="font-serif italic text-3xl mb-6">{step.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-medium italic opacity-80">{step.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section id="contact" className="px-6 md:px-12 py-32 bg-brand-bg">
          <div className="bg-brand-primary p-12 md:p-32 text-center relative overflow-hidden group">
             <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/lux-akure/1920/1080')] bg-cover bg-center opacity-10 mix-blend-overlay group-hover:scale-105 transition-transform duration-[5s]"></div>
             <div className="relative z-10 flex flex-col items-center">
               <h2 className="font-serif text-5xl md:text-8xl text-white mb-10 leading-[0.95] italic">
                 Secure Your <br />
                 <span className="not-italic font-bold text-brand-accent">Next Legacy.</span>
               </h2>
               <p className="text-white/60 text-lg md:text-xl mb-16 max-w-2xl font-medium italic">
                 Don't wait for the market to move. Secure high-growth Akure land with Ministry-backed verification today. Consult with our premium asset managers.
               </p>
               <div className="flex flex-col md:flex-row gap-8">
                 <button 
                  onClick={() => setIsSchedulerOpen(true)}
                  className="bg-brand-accent text-brand-primary px-12 py-6 text-xs font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-transform">
                   Inquire & Book Consultation
                 </button>
                 <a 
                   href={WHATSAPP_LINK}
                   className="border border-brand-accent/30 text-brand-accent px-12 py-6 text-xs font-black uppercase tracking-[0.2em] hover:bg-brand-accent hover:text-brand-primary transition-all flex items-center justify-center gap-3 backdrop-blur-sm"
                 >
                   <MessageCircle size={18} /> Direct WhatsApp
                 </a>
               </div>
             </div>
             <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-brand-accent opacity-5 rounded-full blur-[120px]"></div>
          </div>
        </section>
      </main>

      <footer className="bg-brand-primary border-t border-white/5 pt-24 pb-16 px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
          <div className="col-span-1 md:col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-brand-accent flex items-center justify-center rounded-xs transform -rotate-3">
                <span className="text-brand-primary font-serif text-2xl font-black italic">S</span>
              </div>
              <h1 className="text-white text-base font-black tracking-[0.2em] uppercase leading-none">{APP_NAME}</h1>
            </div>
            <p className="text-white/40 text-[10px] leading-relaxed uppercase font-bold tracking-[0.3em] mt-2">
              Legacy Estate Consulting • Akure, Ondo State. Nigeria.
            </p>
          </div>
          
          <div>
            <h4 className="text-brand-accent text-[9px] font-black uppercase tracking-[0.5em] mb-10">Access Collection</h4>
            <ul className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] space-y-6">
              <li><a href="#listings" className="hover:text-brand-accent transition-colors">Vetted Listings</a></li>
              <li><button onClick={() => setIsSchedulerOpen(true)} className="hover:text-brand-accent transition-colors">Schedule Visit</button></li>
              <li><a href="#process" className="hover:text-brand-accent transition-colors">The Shield Protocol</a></li>
              <li><a href="#" className="hover:text-brand-accent transition-colors">Investor Login</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-accent text-[9px] font-black uppercase tracking-[0.5em] mb-10">Direct Contact</h4>
            <ul className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em] space-y-6">
              <li className="flex items-center gap-4 group transition-colors hover:text-brand-accent"><Phone size={14} className="text-brand-accent" /> +234 800 000 0000</li>
              <li className="flex items-center gap-4 group transition-colors hover:text-brand-accent"><MessageCircle size={14} className="text-brand-accent" /> <a href={WHATSAPP_LINK}>Official WhatsApp</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-brand-accent text-[9px] font-black uppercase tracking-[0.5em] mb-10">Search Index</h4>
            <div className="flex bg-white/5 border border-white/10 p-1 group">
              <input 
                type="text" 
                placeholder="BY ZONE..." 
                className="bg-transparent text-[10px] p-4 flex-1 focus:outline-none text-white font-black uppercase tracking-[0.2em]"
              />
              <button className="bg-brand-accent text-brand-primary px-6 group-hover:brightness-110">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <p className="text-white/20 text-[8px] font-black uppercase tracking-[0.6em]">
            © {new Date().getFullYear()} {APP_NAME} Estate Consultant • Akure Excellence
          </p>
          <div className="flex gap-12 text-[9px] font-black uppercase tracking-[0.4em] text-white/20">
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
