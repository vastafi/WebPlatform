import { useEffect, useState } from "react";
import axios from "axios";
import { FormInput, FormMap, StyledButton, StyledTableRow } from "./styles";
import MDBox from "components/MDBox";

const UpdateMap = ({id, setState, forceUpdate}) => {
    const [map, setMap] = useState({})
    const [newMap, setNewMap] = useState({
        zoom: "",
        centerLat: "",
        centerLng: "",
        name: "",
      });

      console.log(map)

      const [errors, setErrors] = useState({
        zoom: false,
        centerLat: false,
        centerLng: false,
        centnameerLng: false,
      });

      const changeHandler = (e) => {
        setMap({
          ...map,
          [e.target.name]: e.target.value,
        });
      };

    useEffect(() => {
        async function getMap() {
            try {
                const response = await axios.get(`http://localhost:3001/api/maps/${id}`);
                setMap(response.data)
            } catch (error) {
                console.error(error);
            }
        }
        getMap()
    }, [])


    const submitHandler = (e) => {
        e.preventDefault()
        const d = new Date();
        const month = d.getMonth()
        const year = d.getFullYear()
        const date = d.getDate()
        const newDate = `${year}/${month}/${date}`
        try {
            axios.put('http://localhost:3001/api/maps/', {...map, date: newDate, id: id});
          } catch (error) {
            console.error(error);
          }

          setState({state: false, id: null})
          forceUpdate()
    }

    console.log(map);

    return (

        <FormMap
            component="form"
            role="form"
            onSubmit={submitHandler}
            display="flex"
            gap="40px"
            flexDirection="column"
        >
            <MDBox>
                <FormInput
                    type="name"
                    fullWidth
                    value={map.name}
                    name="name"
                    placeholder="New map name"
                    onChange={changeHandler}
                />

                {errors.name && (
                    <Typography variant="caption" color="error" fontWeight="light">
                        Map name is required!!!
                    </Typography>
                )}
            </MDBox>

            <MDBox>
                <FormInput
                    type="number"
                    fullWidth
                    value={map.zoom}
                    name="zoom"
                    placeholder="zoom"
                    onChange={changeHandler}
                />
                {errors.zoom && (
                    <Typography variant="caption" color="error" fontWeight="light">
                        zoom is required
                    </Typography>
                )}
            </MDBox>

            <MDBox>
                <FormInput
                    type="number"
                    fullWidth
                    value={map.centerLat}
                    name="centerLat"
                    placeholder="CenterLat"
                    onChange={changeHandler}
                />
                {errors.centerLat && (
                    <Typography variant="caption" color="error" fontWeight="light">
                        centerLat is required
                    </Typography>
                )}
            </MDBox>

            <MDBox>
                <FormInput
                    type="number"
                    fullWidth
                    value={map.centerLng}
                    name="centerLng"
                    placeholder="CenterLng"
                    onChange={changeHandler}
                />
                {errors.centerLng && (
                    <Typography variant="caption" color="error" fontWeight="light">
                        CenterLng is required
                    </Typography>
                )}
            </MDBox>

            <StyledButton variant="contained"
                type="submit">
                Save Map
            </StyledButton>
        </FormMap>
    );
};

export default UpdateMap;
