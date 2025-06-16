import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    setStatus('Submitting...');
    
    setTimeout(() => {
      setStatus('Message Sent! We will get back to you soon.');
      setFormData({ name: '', email: '', message: '' });
    }, 2000);
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-black">Contact Us</h1>
        <p className="text-lg text-black mt-2">We’d love to hear from you. Reach out to us!</p>
      </header>

      <section className="bg-gray-100 p-6 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-semibold text-black">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={formData.name}
              placeholder='Enter your name'
              onChange={handleChange}
              className="mt-1 w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" 
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-black">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter your email'
              className="mt-1 w-full p-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" 
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-semibold text-black">Message</label>
            <textarea 
              id="message" 
              name="message" 
              value={formData.message}
              onChange={handleChange}
              placeholder='Enter your message'
              className="mt-1 w-full p-3 text-black border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black" 
              rows="5"
              required
            ></textarea>
          </div>

          <button 
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Send Message
          </button>
        </form>
        
        {status && (
          <div className="mt-4 text-center text-black">
            <p>{status}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Contact;