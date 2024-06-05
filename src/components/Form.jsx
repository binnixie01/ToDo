import React, {useState} from 'react'

const Form = ({submitTodo}) => {
    const [input, setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
      };

    const handleSubmit=(e)=>{
        e.preventDefault();
        submitTodo({todo:input,completed:false})
        setInput('')
    }
    return (
        <form className="flex" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Write Todo..."
                onChange={handleChange}
                value={input}
                className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
            />
            <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
                Add
            </button>
        </form>)
}

export default Form