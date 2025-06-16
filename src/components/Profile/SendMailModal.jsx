import React from "react";
import { useSendMailMutation } from "../../features/User/userSlice";

const SendMailModal = ({setMailModalOpen, user_id, sender_id}) => {
    const [content, setContent] = React.useState("");

    const [sendMail, {isLoading, isError, error, isSuccess}] = useSendMailMutation();


    const handleSubmit = async (event) => {
        event.preventDefault();
        await sendMail({
            user_id: parseInt(user_id),
            sender_id: parseInt(sender_id),
            content: content
        }).unwrap();

        setMailModalOpen(false);
        setContent("");
    }

	return (
		<div className="fixed inset-0 flex items-center justify-center z-10 bg-transparent backdrop-blur-lg bg-opacity-50">
			<div className="bg-gray-50 p-6 rounded-lg shadow-lg w-full max-w-md">
				<h2 className="text-xl font-semibold mb-4">Send Mail</h2>
				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label
							className="block text-sm font-medium mb-2"
							htmlFor="message"
						>
							Message
						</label>
						<textarea
							id="message"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Type your message here..."
							className="w-full border border-gray-300 rounded-lg px-3 py-2"
							rows="4"
							required
						></textarea>
					</div>
                    {isError && (
                        <p className="text-red-500 text-sm mb-4">
                            An error occurred while sending the mail. Please try again.
                        </p>
                    )}
					<div className="flex justify-end">
						<button
							type="button"
							onClick={() => setMailModalOpen(false)}
							className="mr-2 cursor-pointer px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
						>
							Close
						</button>
						<button
							type="submit"
							className="px-4 cursor-pointer py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
						>
							Send
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default SendMailModal;
