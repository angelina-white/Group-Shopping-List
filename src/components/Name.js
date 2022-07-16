import Dropdown from "react-bootstrap/Dropdown";

function Name({ nameId, name, changeName })
{
    function handleChangeName()
    {
        let nameObj = 
        {
            nameId: nameId,
            name: name
        }

        changeName(nameObj)
    }

    return (
        <Dropdown.Item as="button" onClick={ handleChangeName } value={ name }>{ name }</Dropdown.Item>
    )
}
export default Name