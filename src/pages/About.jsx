import React from 'react';

const About = () => {
  return (
    <div className="max-w-full mx-auto mt-5 flex flex-col px-4 sm:px-6 lg:px-8 xl:px-10 py-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-extrabold text-black">Welcome to Blogifyon</h1>
        <p className="text-lg text-black mt-2">Where thoughts become stories, and stories become conversations.</p>
      </header>

      <section className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-3xl font-semibold text-black">Our Mission</h2>
        <p className="mt-4 text-black">
          Our mission is simple: to spark meaningful conversations through the written word. We're dedicated to bringing you insightful articles, engaging stories, and thought-provoking content across a variety of topics.
        </p>
      </section>

      <section className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-3xl font-semibold text-black">What We Stand For</h2>
        <ul className="mt-4 text-black space-y-3">
          <li><strong>Creativity:</strong> We celebrate fresh ideas and stories that resonate.</li>
          <li><strong>Inspiration:</strong> Each post is written with the intention to spark curiosity and motivate action.</li>
          <li><strong>Community:</strong> We value open discussions and foster a welcoming environment for all voices.</li>
        </ul>
      </section>

      <section className="bg-gray-100 p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-3xl font-semibold text-black">Our Content</h2>
        <p className="mt-4 text-black">
          We cover a wide range of topics that matter to you. Whether you’re looking for practical advice, in-depth analysis, or just some creative inspiration, we’ve got you covered:
        </p>
        <ul className="mt-4 text-black list-disc pl-5 space-y-2">
          <li><strong>Lifestyle</strong>: Tips on living well and embracing personal growth.</li>
          <li><strong>Technology</strong>: Stay updated with the latest digital trends and tech innovations.</li>
          <li><strong>Creativity</strong>: Creative writing tips, artistic inspiration, and more.</li>
          <li><strong>Wellness</strong>: Articles on mental health, fitness, and holistic well-being.</li>
          <li><strong>Personal Growth</strong>: Motivational content to help you reach your full potential.</li>
        </ul>
      </section>

      <section className="text-center mt-4">
        <h3 className="text-2xl font-semibold text-black">Join the Blogifyon Community</h3>
        <p className="mt-4 text-lg text-black">
          If you're interested in contributing or have any questions, feel free to reach out to us at <strong>contact@blogifyon.com</strong>.
        </p>
      </section>
    </div>
  );
};

export default About;

