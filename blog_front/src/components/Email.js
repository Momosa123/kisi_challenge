
import {useState} from 'react'


export default function ContactForm (){

  const [status, setStatus] = useState("Submit");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    const { name, email, subject, message } = e.target.elements;
    let details = {
      name: name.value,
      email: email.value,
      subject: subject.value,
      message: message.value,
    };

    let response = await fetch("/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(details),
    });
    setStatus("Submit");
    // let result = await response.json();
    alert('Message Sent');
  };

  return(

    <footer>
      <form
      className='emailForm'
      onSubmit={handleSubmit}>
    
          <div className="name">
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Name"
              required
            />
          </div>
          <div className="email">
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Email"
              required
            />
          </div>
          <div className="subject">
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Subject"
            />
          </div>
          <div className="message">
            <textarea
              name="message"
              id="message"
              placeholder="Message"
            ></textarea>
          </div>
          
              <div className="send"><input  type="submit" value={status} /></div>
              <div className="erase">
                <input  type="reset" value="Erase" class="alt" />
              </div>
          
    
      </form>
      <h6>Made with ❤️❤️❤️ by Mouhamadou</h6>
      <h6>© 2022, All rights reserved</h6>
    </footer>
  )
}