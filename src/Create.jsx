import { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Create=()=>
{
    const [title,setTitle]=useState('');
    const [body,setBody]=useState('');
    const [author,setAuthor]=useState('shivam');
    const [ispending,setIsPending]=useState(false);
    const history=useNavigate();

    const handleSubmit=(e)=>
    {
        e.preventDefault();
        const blog={title,body,author};
        setIsPending(true);

        fetch('http://localhost:8000/blogs',{
            method:'POST',
            headers:{"content-Type":"application/json"},
            body:JSON.stringify(blog)
        })
          .then(()=>
          {
              console.log("New Blog added");
              setIsPending(false);
              history('/');
          })
    }

    return(
        <div className="create">
            <h2>Add a new blog</h2>
            <form onSubmit={handleSubmit}> 
                <label>Blog Title:</label>
                <input
                    type="text"
                    required
                    value={title}
                    onChange={(e)=>setTitle(e.target.value)}
                />

                <label>Blog Body:</label>
                <textarea
                    required
                    value={body}
                    onChange={(e)=>setBody(e.target.value)}
                >
                </textarea>

                <label>Blog Author:</label>
                <select
                    value={author}
                    onChange={(e)=>setAuthor(e.target.value)}
                >
                    <option value="shivam">shivam</option>
                    <option value="shiva">shiva</option>
                </select>

                {!ispending && <button>Add Blog</button>}
                {ispending && <button disabled>Adding Blog...</button>}
                
            </form>
        </div>
    );
}

export default Create;