import React from "react";
import { Link } from "react-router";

const Footer = () => {
	return (
		<footer className="mt-10 border-t border-gray-300 bg-gray-50 text-gray-700">
			<div className="max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8 xl:px-10 py-8">
				<div className="flex flex-col md:flex-row justify-between gap-8">
					{/* <!-- Logo and description --> */}
					<div className="flex flex-col gap-2">
						<div className="flex items-center gap-2">
							<img
								className="w-10 h-10"
								src="../images/leaf.png"
								alt="Logo"
							/>
							<h2 className="text-xl font-bold">Blogifyon</h2>
						</div>
						<p className="text-sm text-gray-500">
							Your daily dose of inspiring stories and fresh
							perspectives.
						</p>
					</div>

					{/* <!-- Quick links --> */}
					<div className="flex flex-col gap-2">
						<h3 className="font-semibold text-lg">Quick Links</h3>
						<Link to="/" className="text-sm hover:underline">
							Home
						</Link>
						<Link to="/about" className="text-sm hover:underline">
							About
						</Link>
						<Link to="/contact" className="text-sm hover:underline">
							Contact
						</Link>
					</div>

					{/* <!-- Socials --> */}
					<div className="flex flex-col gap-2">
						<h3 className="font-semibold text-lg">Follow Us</h3>
						<a href="https://www.twitter.com/" target="_blank" className="text-sm hover:underline">
							Twitter
						</a>
						<a href="https://www.instagram.com/" target="_blank" className="text-sm hover:underline">
							Instagram
						</a>
						<a href="https://www.linkedin.com/" target="_blank" className="text-sm hover:underline">
							LinkedIn
						</a>
						<a href="https://www.facebook.com/" target="_blank" className="text-sm hover:underline">
							Facebook
						</a>
					</div>
				</div>

				{/* <!-- Copyright --> */}
				<div className="mt-8 border-t pt-4 text-center text-sm text-gray-400">
					© {new Date().getFullYear()} Blogifyon. All rights reserved.
				</div>
			</div>
		</footer>
	);
};

export default Footer;
