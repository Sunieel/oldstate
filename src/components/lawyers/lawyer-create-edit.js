
import { Autocomplete, Stack, FormControl, MenuItem, Select, Box, Container, FormHelperText, Grid, InputLabel, Typography, Button, TextField, Card, CardContent, Divider, Switch } from '@mui/material';
import toast from 'react-hot-toast';

import { v4 as uuidv4 } from 'uuid';

import { useFormik, getIn } from 'formik';
import * as Yup from 'yup';


import { useState, useCallback, useEffect } from 'react';

import { useMounted } from '../../hooks/use-mounted';

import { useAuth } from '../../hooks/use-auth';
import { Auth } from 'aws-amplify';

import { API, Storage } from 'aws-amplify';
import { createUpdatedProviderListing, updateUpdatedProviderListing } from '../../graphql/mutations';

import { FileDropzone } from '../../components/file-dropzone';
import { fileToBase64 } from '../../utils/file-to-base64';
import { QuillEditor } from '../../components/quill-editor';
import { Amplify } from 'aws-amplify';
import Image from 'next/image';
import { postcodeApi } from '../../__fake-api__/postcodes-api';

import awsExports from '../../aws-exports';
import { forUrl } from '../../utils/text-normaliser';
Amplify.configure(awsExports);

const _ = require('lodash');

const getFileExtensionFromType = (type) => {
    const split = type.split('/');
    return split[split.length - 1];
}

export const LawyerCreateEdit = (props) => {

    const { lawyerdetails: lawyerDetails, router } = props;

    const { user } = useAuth();
    const isMounted = useMounted();
    const phoneRegExp = /^\(?(?:\+?61|0)(?:(?:2\)?[ -]?(?:3[ -]?[38]|[46-9][ -]?[0-9]|5[ -]?[0-35-9])|3\)?(?:4[ -]?[0-57-9]|[57-9][ -]?[0-9]|6[ -]?[1-67])|7\)?[ -]?(?:[2-4][ -]?[0-9]|5[ -]?[2-7]|7[ -]?6)|8\)?[ -]?(?:5[ -]?[1-4]|6[ -]?[0-8]|[7-9][ -]?[0-9]))(?:[ -]?[0-9]){6}|4\)?[ -]?(?:(?:[01][ -]?[0-9]|2[ -]?[0-57-9]|3[ -]?[1-9]|4[ -]?[7-9]|5[ -]?[018])[ -]?[0-9]|3[ -]?0[ -]?[0-5])(?:[ -]?[0-9]){5})$/
    const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    //^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

    // const [logoValue, setLogoValue] = useState(null);

    // const logoChange = (e) => setLogoValue(e[0]);


    // const test = new UpdatedProviderListing();
    // test.setWorkingHours("");


    const [isPremium, setIsPremium] = useState(false);

    const [isUserAdmin, setIsUserAdmin] = useState(false);
    const [isUserPremium, setIsUserPremium] = useState(false);
    const [isListingPremium, setIsListingPremium] = useState(false);

    const getIsPremium = useCallback(async () => {
        try {
            if (user) {
                if (user.admin) {
                    setIsUserAdmin(true);
                    // setIsPremium(true);
                }
                if (user.subscriptionPlan && user.subscriptionPlan === "Premium") {
                    setIsUserPremium(true);
                    // setIsPremium(true);
                }
            }
            if (lawyerDetails && lawyerDetails.membership === "premium") {
                setIsListingPremium(true);
                setIsPremium(true);
            }
        } catch (err) {
            console.error(err);
        }
    }, [user]);

    useEffect(() => {
        getIsPremium();
    },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [getIsPremium]);



    const [logoValue, setLogoValue] = useState(
        lawyerDetails ? lawyerDetails.logo : null
    );
    const [logoData, setLogoData] = useState(null);


    // useEffect(() => {
    //   gtm.push({ event: 'page_view' });
    // }, []);

    const [accreditationLogoDataSet, setAccreditationLogoDataSet] = useState({});

    const handleAccreditationLogoRemove = (_, index) => {
        const newAccreditationLogoDataSet = { ...accreditationLogoDataSet };
        delete newAccreditationLogoDataSet[index];
        setAccreditationLogoDataSet(newAccreditationLogoDataSet);
    }

    const handleAccreditationLogoDrop = async ([file], index) => {
        const data = await fileToBase64(file);
        setAccreditationLogoDataSet({
            ...accreditationLogoDataSet, [index]: {
                data,
                file,
            }
        });
        // formik.setFieldValue(`premiumAccreditations.[${index}].image`, "dummy");
    };

    const [peopleLogoDataSet, setPeopleLogoDataSet] = useState({});

    const handlePersonLogoRemove = (_, index) => {
        const newPeopleLogoDataSet = { ...peopleLogoDataSet };
        delete newPeopleLogoDataSet[index];
        setPeopleLogoDataSet(newPeopleLogoDataSet);
    }

    const handlePersonLogoDrop = async ([file], index) => {
        const data = await fileToBase64(file);
        setPeopleLogoDataSet({
            ...peopleLogoDataSet, [index]: {
                data,
                file,
            }
        });
        // formik.setFieldValue(`premiumPeople.[${index}].image`, "dummy");
    };

    // TODO what if the listings name changes?
    // Is the URL_KEY changed?
    // It then needs to reflect in the user auth object
    // For now at least, the url key does not change
    const addListingToUser = async (place_id, url_key, state) => {
        const authUser = await Auth.currentAuthenticatedUser();

        const listings = authUser.attributes["custom:listings"];
        let updatedListings = null;

        const newItem = {
            state,
            place_id,
            url_key
        }

        if (listings) {
            try {
                const listingsParsed = JSON.parse(listings);
                const found = listingsParsed.find(l => l.place_id == place_id);
                if (!found) {
                    listingsParsed.push(newItem);
                    updatedListings = listingsParsed;
                } else {
                    // already there no need to add
                    return;
                }
            } catch (error) {
                updatedListings = [newItem]
            }
        } else {
            updatedListings = [newItem]
        }

        if (updatedListings) {
            await Auth.updateUserAttributes(authUser, {
                'custom:listings': JSON.stringify(updatedListings),
            });
        }

    }

    const handleDropCover = async ([file]) => {
        const data = await fileToBase64(file);
        setLogoData(data);
        setLogoValue(file);
    };

    const handleRemove = () => {
        setLogoValue(null);
        setLogoData(null);
    };

    // const uploadCompanyLogo = async () => {
    //     try {
    //         await Storage.configure({ level: "public" });
    //         if (logoData) {
    //             const ext = getFileExtensionFromType(logoValue.type);
    //             const fullFileName = `deleteme.${ext}`;
    //             await Storage.put(fullFileName, logoValue, {
    //                 contentType: logoValue.type,
    //                 level: "public"
    //             });
    //         }
    //     } catch (e) {
    //         console.log(e);
    //     }
    // }

    const formik = useFormik({
        initialValues: {

            name: lawyerDetails && lawyerDetails.name || '',
            city: lawyerDetails && lawyerDetails.city || '',
            street: lawyerDetails && lawyerDetails.street || '',
            postal_code: lawyerDetails && lawyerDetails.postal_code || '',
            state: lawyerDetails && lawyerDetails.state || '',

            description: lawyerDetails && lawyerDetails.description || '',

            jurisdiction: lawyerDetails && lawyerDetails.jurisdiction || '',

            languages: lawyerDetails && lawyerDetails.languages || [],

            type: lawyerDetails && lawyerDetails.type || '',
            subtypes: lawyerDetails && lawyerDetails.subtypes || '',

            phone: lawyerDetails && lawyerDetails.phone || '',
            site: lawyerDetails && lawyerDetails.site || '',

            // TODO make editable?
            email: lawyerDetails && lawyerDetails.email || '',

            facebook: lawyerDetails && lawyerDetails.facebook || '',
            instagram: lawyerDetails && lawyerDetails.instagram || '',
            linkedin: lawyerDetails && lawyerDetails.linkedin || '',
            twitter: lawyerDetails && lawyerDetails.twitter || '',

            working_hours: {
                Monday: lawyerDetails && lawyerDetails.working_hours && lawyerDetails.working_hours.Monday || '',
                Tuesday: lawyerDetails && lawyerDetails.working_hours && lawyerDetails.working_hours.Tuesday || '',
                Wednesday: lawyerDetails && lawyerDetails.working_hours && lawyerDetails.working_hours.Wednesday || '',
                Thursday: lawyerDetails && lawyerDetails.working_hours && lawyerDetails.working_hours.Thursday || '',
                Friday: lawyerDetails && lawyerDetails.working_hours && lawyerDetails.working_hours.Friday || '',
                Saturday: lawyerDetails && lawyerDetails.working_hours && lawyerDetails.working_hours.Saturday || '',
                Sunday: lawyerDetails && lawyerDetails.working_hours && lawyerDetails.working_hours.Sunday || '',
            },

            premiumOverview: lawyerDetails && lawyerDetails.premiumOverview || '',
            premiumServices: lawyerDetails && lawyerDetails.premiumServices || [{
                title: '',
                content: '',
            }],
            premiumPeople: lawyerDetails && lawyerDetails.premiumPeople || [{
                name: '',
                title: '',
                image: '',
                location: '',
                spiel: '',
                specialty: '',
                languages: '',
            }],
            premiumAccreditations: lawyerDetails && lawyerDetails.premiumAccreditations || [{
                name: '',
                image: '',
                year: '',
            }],
            premiumFees: lawyerDetails && lawyerDetails.premiumFees || [{
                title: '',
                price: '',
            }],
            premiumFaqs: lawyerDetails && lawyerDetails.premiumFaqs || [{
                question: '',
                answer: '',
            }],

            // lat long 

            submit: null
        },
        validationSchema: Yup.object({

            name: Yup
                .string()
                .max(255)
                .required('Name is required'),


            type: Yup
                .string()
                .max(255)
                .required('Type is required'),
            site: Yup
                .string()
                .max(255)

                .required('Website is required'),
            email: Yup
                .string()
                // .matches(emailRegExp, 'Email is not valid')
                .email('Must be a valid email')
                .max(255)
                .required('Email is required'),
            phone: Yup
                .string()
                // TODO took out because it wasn't quite right
                // .matches(phoneRegExp, 'Phone number is not valid')
                .max(255)
                .required('Phone number is required'),

            // address: Yup
            // .string()
            // .max(255)
            // .required('Address is required'),


            description: Yup
                .string()
                // .max()
                .required('Summarised Overview is required'),

            street: Yup
                .string()
                .max(255)
                .required('Street is required'),
            city: Yup
                .string()
                .max(255)
                .required('City is required'),
            postal_code: Yup
                .string()
                .max(255)
                .required('Post code is required'),
            state: Yup
                .string()
                .max(255)
                .required('State is required'),


            facebook: Yup
                .string()
                .max(255),
            instagram: Yup
                .string()
                .max(255),
            linkedin: Yup
                .string()
                .max(255),
            twitter: Yup
                .string()
                .max(255),

            working_hours: Yup.object().shape({
                Monday: Yup
                    .string()
                    .max(255)
                    .required('Monday hours is required'),
                Tuesday: Yup
                    .string()
                    .max(255)
                    .required('Tuesday hours is required'),
                Wednesday: Yup
                    .string()
                    .max(255)
                    .required('Wednesday hours is required'),
                Thursday: Yup
                    .string()
                    .max(255)
                    .required('Thursday hours is required'),
                Friday: Yup
                    .string()
                    .max(255)
                    .required('Friday hours is required'),
                Saturday: Yup
                    .string()
                    .max(255)
                    .required('Saturday hours is required'),
                Sunday: Yup
                    .string()
                    .max(255)
                    .required('Sunday hours is required'),
            }),

            languages: Yup
                .string()
                .max(255),

            jurisdiction: Yup
                .string()
                .max(255),

            premiumOverview: Yup
                .string(),

            premiumServices: Yup.array()
                .of(Yup.object().shape({
                    title: Yup
                        .string()
                        .max(255),
                    content: Yup
                        .string()
                })),

            premiumPeople: Yup.array()
                .of(Yup.object().shape({
                    name: Yup
                        .string()
                        .max(255),
                    title: Yup
                        .string()
                        .max(255),
                    image: Yup
                        .string()
                        .max(255),
                    image: Yup
                        .string()
                        .max(255),
                    location: Yup
                        .string()
                        .max(255),
                    spiel: Yup
                        .string(),
                    // .max(255)
                })),

            premiumAccreditations: Yup.array()
                .of(Yup.object().shape({
                    name: Yup
                        .string()
                        .max(255),
                    image: Yup
                        .string()
                        .max(255),
                    year: Yup
                        .string()
                        .max(255),
                })),

            premiumFees: Yup.array()
                .of(Yup.object().shape({
                    title: Yup
                        .string()
                        .max(255),
                    price: Yup
                        .string()
                        .max(255),

                })),

            premiumFaqs: Yup.array()
                .of(Yup.object().shape({
                    question: Yup
                        .string()
                        .max(255),
                    answer: Yup
                        .string()
                    // .max(255)
                })),


        }),
        onSubmit: async (values, helpers) => {
            try {
                // USE EXISTING IF THERE
                const place_id = lawyerDetails && lawyerDetails.place_id ? lawyerDetails.place_id : "custom." + uuidv4();

                const newListing = { ...formik.values };
                newListing.place_id = place_id;

                if (!lawyerDetails) {
                    newListing.pending = true;
                }


                const nameForUrl = forUrl(newListing.name);
                const townForUrl = forUrl(newListing.city);
                const url_key = `${newListing.postal_code}:::-:::${townForUrl}:::-:::${nameForUrl}`;
                newListing.url_key = lawyerDetails && lawyerDetails.url_key ? lawyerDetails.url_key : url_key;


                const stateForUrl = forUrl(newListing.state);
                const stateShort = postcodeApi.getShortState(stateForUrl);
                const stateShortForUrl = forUrl(stateShort);

                const city_key = `${stateShortForUrl}:::-:::${townForUrl}`
                newListing.city_key = lawyerDetails && lawyerDetails.city_key ? lawyerDetails.city_key : city_key;

                // isPremium
                const membership = premiumChecked ? "premium" : "claimed";
                newListing.membership = membership;


                newListing.full_address = `${values.street}, ${values.city}, ${values.state}, ${values.postal_code}`;

                delete newListing.submit;

                newListing.features = [];
                if(featureBookOnlineChecked){
                    newListing.features.push("book-online")
                }
                if(featureFixedFeesChecked){
                    newListing.features.push("fixed-fees")
                }
                if(featureFreeFirstAppointmentChecked){
                    newListing.features.push("free-first-appointment")
                }
                if(featureNoWinNoFeeChecked){
                    newListing.features.push("no-win-no-fee")
                }

                // IMAGE UPLOADS
                // NEED TO BE DONE BEFORE SAVING LISTING
                // SO WE CAN STORE THE URL IN LISTING
                try {
                    await Storage.configure({ level: "public" });
                    // logoData existing means it's been changed
                    // otherwise don't change it, it will use existing
                    if (logoData) {
                        const ext = getFileExtensionFromType(logoValue.type);
                        const fullFileName = `${place_id}.${ext}`;
                        await Storage.put(fullFileName, logoValue, {
                            contentType: logoValue.type,
                            level: "public"
                        });
                        // TODO Could just save key
                        // And get bucket prefix dynamically
                        // then we can separate dev and prod
                        newListing.logo = `https://logos103357-staging.s3.ap-southeast-2.amazonaws.com/public/${fullFileName}`;
                    }

                    // SAVE ACCREDITATION IMAGES
                    // DATA being present means there was an upload
                    const accPromises = Object.keys(accreditationLogoDataSet).map(key => {
                        const imageKey = place_id + "." + uuidv4();
                        const imageFile = accreditationLogoDataSet[key].file;
                        const ext = getFileExtensionFromType(imageFile.type);
                        const fullFileName = `${imageKey}.${ext}`;
                        return Storage.put(fullFileName, imageFile, {
                            contentType: imageFile.type,
                            level: "public"
                        }).then(() => {
                            newListing.premiumAccreditations[key].image = `https://logos103357-staging.s3.ap-southeast-2.amazonaws.com/public/${fullFileName}`;
                        })
                    });

                    // SAVE PEOPLE IMAGES
                    // DATA being present means there was an upload
                    const peoplePromises = Object.keys(peopleLogoDataSet).map(key => {
                        const imageKey = place_id + "." + uuidv4();
                        const imageFile = peopleLogoDataSet[key].file;
                        const ext = getFileExtensionFromType(imageFile.type);
                        const fullFileName = `${imageKey}.${ext}`;
                        return Storage.put(fullFileName, imageFile, {
                            contentType: imageFile.type,
                            level: "public"
                        }).then(() => {
                            newListing.premiumPeople[key].image = `https://logos103357-staging.s3.ap-southeast-2.amazonaws.com/public/${fullFileName}`;
                        })
                    });

                    await Promise.all(accPromises.concat(peoplePromises));

                } catch (e) {
                    // Cancel the while save?
                    console.log("Error uploading files: ", e);
                }

                try {
                    await addListingToUser(newListing.place_id, newListing.url_key, stateShortForUrl);
                } catch (e) {
                    console.log("Error adding listing to auth user: ", e);
                }

                if (lawyerDetails) {
                    // UPDATE - edit page
                    await API.graphql({
                        query: updateUpdatedProviderListing,
                        variables: { input: newListing },
                        authMode: 'AMAZON_COGNITO_USER_POOLS',
                    });
                    toast.success("Changes saved", { duration: 5000 });
                    router.reload();
                } else {
                    // CREATE - new page
                    await API.graphql({
                        query: createUpdatedProviderListing,
                        variables: { input: newListing },
                        authMode: 'AMAZON_COGNITO_USER_POOLS',
                    });
                    toast.success("Listing created for review. You will be notified within 3 working days", { duration: 5000 })
                    // TODO also clear images
                    helpers.resetForm()
                }


            } catch (err) {
                console.error(err);
                toast.error(`Error ${lawyerDetails ? "editing" : "creating"} listing`, { duration: 5000 })

                if (isMounted()) {
                    helpers.setStatus({ success: false });
                    helpers.setErrors({ submit: err.message });
                    helpers.setSubmitting(false);
                }
            }
        }
    });

    const ausStates = postcodeApi.getStatesSync().sort((a, b) => (a.short > b.short) ? 1 : ((b.short > a.short) ? -1 : 0))

    const [briefOverviewText, setBriefOverviewText] = useState("");

    const briefOverviewChange = (value, delta, source, editor) => {
        // setBriefOverview(value);
        formik.setFieldValue('description', value);
        setBriefOverviewText(editor.getText(value).replace(/\n/g, " ")) //.trim().replace(" ", "").replace(/\n/g, "")
    };

    const detailedOverviewChange = (value) => {
        // setDetailedOverview(value);
        formik.setFieldValue('premiumOverview', value);
    };

    const handleAddService = () => {
        formik.setFieldValue(`premiumServices`, ([...formik.values.premiumServices, {
            title: "",
            content: "",
        }]));
    };

    const handleServiceContentChange = (value, index) => {
        formik.setFieldValue(`premiumServices.${index}.content`, value);
    }

    const handleRemoveService = (index) => {
        const newServicesArray = [...formik.values.premiumServices];
        newServicesArray.splice(index, 1);
        formik.setFieldValue(`premiumServices`, newServicesArray);
    }

    const handleRemovePerson = (index) => {
        const newPeopleArray = [...formik.values.premiumPeople];
        newPeopleArray.splice(index, 1);
        formik.setFieldValue(`premiumPeople`, newPeopleArray);
    }


    const handleAddPerson = () => {
        formik.setFieldValue(`premiumPeople`, ([...formik.values.premiumPeople, {
            name: "",
            title: "",
            specialty: "",
            location: "",
            languages: "",
            spiel: "",
            image: "",
        }]));
    };


    const handlePersonImageChange = (event, index) => {
    }


    const handleAddAccreditation = () => {
        formik.setFieldValue(`premiumAccreditations`, ([...formik.values.premiumAccreditations, {
            name: "",
            image: "",
            year: "",
        }]));
    }

    const handleRemoveAccreditation = (index) => {
        const newAccreditationsArray = [...formik.values.premiumAccreditations];
        newAccreditationsArray.splice(index, 1);
        formik.setFieldValue(`premiumAccreditations`, newAccreditationsArray);
    }

    const handleAddFee = () => {
        formik.setFieldValue(`premiumFees`, ([...formik.values.premiumFees, {
            title: "",
            price: "",
        }]));
    }
    const handleRemoveFee = (index) => {
        const newFeeArray = [...formik.values.premiumFees];
        newFeeArray.splice(index, 1);
        formik.setFieldValue(`premiumFees`, newFeeArray);
    }

    const handleAddFaq = () => {
        formik.setFieldValue(`premiumFaqs`, ([...formik.values.premiumFaqs, {
            question: "",
            answer: "",
        }]));
    }
    const handleRemoveFaq = (index) => {
        const newFaqArray = [...formik.values.premiumFaqs];
        newFaqArray.splice(index, 1);
        formik.setFieldValue(`premiumFaqs`, newFaqArray);
    }


    const [featureBookOnlineChecked, setFeatureBookOnlineChecked] = useState(
        (lawyerDetails
            && lawyerDetails.features
            && lawyerDetails.features.includes("book-online"))
            ? true : false);
    const [featureFixedFeesChecked, setFeatureFixedFeesChecked] = useState(
        (lawyerDetails
            && lawyerDetails.features
            && lawyerDetails.features.includes("fixed-fees"))
            ? true : false);
    const [featureFreeFirstAppointmentChecked, setFeatureFreeFirstAppointmentChecked] = useState(
        (lawyerDetails
            && lawyerDetails.features
            && lawyerDetails.features.includes("free-first-appointment"))
            ? true : false);
    const [featureNoWinNoFeeChecked, setFeatureNoWinNoFeeChecked] = useState(
        (lawyerDetails
            && lawyerDetails.features
            && lawyerDetails.features.includes("no-win-no-fee"))
            ? true : false);

    const checkFeatureBookOnline = (e) => 
        setFeatureBookOnlineChecked(e.target.checked);
    

    const checkFeatureFixedFees = (e) => 
        setFeatureFixedFeesChecked(e.target.checked);

    const checkFeatureFreeFirstAppointment = (e) => 
        setFeatureFreeFirstAppointmentChecked(e.target.checked);
    

    const checkFeatureNoWinNoFee = (e) => 
        setFeatureNoWinNoFeeChecked(e.target.checked);
    




    const [premiumChecked, setPremiumChecked] = useState(
        (lawyerDetails
            && lawyerDetails.membership
            && lawyerDetails.membership == "premium")
            ? true : false
    );

    const checkPremium = (e) => {
        setPremiumChecked(e.target.checked);
        setIsPremium(e.target.checked);
    }

    const goPremium = () => <Box
        align="right"
        sx={{ float: "right" }}>
        <table>
            <tbody>
                <tr>
                    {!isUserAdmin && !isUserPremium &&
                        <td>
                            <Button align="right">
                                GO PREMIUM TO ADD THIS
                            </Button>
                        </td>
                    }
                    {(isUserAdmin || isUserPremium || isListingPremium) && <>
                        <td>
                            <Box align="right"><Typography sx={{ color: "blue", padding: "10px" }}>

                                {isUserAdmin && <>[You are an Admin] </>}
                                {isUserPremium && <>You are a Premium customer<br /></>}
                                {isListingPremium && <>This is a Premium listing<br /></>}


                                {premiumChecked ?
                                    "Turn off Premium" :
                                    "Make listing Premium?"}
                            </Typography></Box>
                        </td>
                        <td>
                            <Switch checked={premiumChecked} onChange={checkPremium} align="right" />
                        </td>
                    </>}
                    <td>
                        <Image
                            align="right"
                            width="50px"
                            height="50px"
                            src="/avstatic/member-badge.png" />
                    </td>
                </tr>
            </tbody>
        </table>
    </Box>;

    return (<Box sx={{
        '& .MuiButton-textPrimary': {
            color: "blue"
        }
    }}>
        <form
            noValidate
            onSubmit={formik.handleSubmit}
            {...props}
        >

            <Typography
                color="#FF5403"
                variant="h3"
            >
                {lawyerDetails ? "EDIT" : "CREATE NEW"} PROFILE
                {goPremium()}
            </Typography>

            {/* {!isPremium && <Card>{goPremium()}</Card>} */}

            {/* {JSON.stringify(formik.values)} */}
            {/* {isListingPremium ? "yesy" : "noy"} */}
            {/* {JSON.stringify(lawyerDetails)} */}

            <Card sx={{ mt: 5 }}>
                <CardContent>
                    <Typography variant="h6">
                        Firm basic details
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <TextField
                            required
                            error={Boolean(formik.touched.name && formik.errors.name)}
                            fullWidth
                            helperText={formik.touched.name && formik.errors.name}
                            label="Firm Name"
                            margin="normal"
                            name="name"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.name}
                        />
                        <TextField
                            required
                            error={Boolean(formik.touched.type && formik.errors.type)}
                            fullWidth
                            helperText={formik.touched.type && formik.errors.type}
                            label="Firm Type"
                            margin="normal"
                            name="type"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.type}
                        />
                        <TextField
                            required
                            error={Boolean(formik.touched.site && formik.errors.site)}
                            fullWidth
                            helperText={formik.touched.site && formik.errors.site}
                            label="Firm Website"
                            margin="normal"
                            name="site"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.site}
                        />
                        <TextField
                            required
                            error={Boolean(formik.touched.phone && formik.errors.phone)}
                            fullWidth
                            helperText={formik.touched.phone && formik.errors.phone}
                            label="Firm Phone Number"
                            margin="normal"
                            name="phone"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.phone}
                        />
                        <TextField
                            required
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            fullWidth
                            helperText={formik.touched.email && formik.errors.email}
                            label="Firm Email"
                            margin="normal"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.email}
                        />
                        <TextField
                            required
                            error={Boolean(formik.touched.languages && formik.errors.languages)}
                            fullWidth
                            helperText={formik.touched.languages && formik.errors.languages}
                            label="Languages Spoken"
                            margin="normal"
                            name="languages"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.languages}
                        />
                    </Box>
                </CardContent>
            </Card>

            {/* <TextField
                    error={Boolean(formik.touched.address && formik.errors.address)}
                    fullWidth
                    helperText={formik.touched.address && formik.errors.address}
                    label="address"
                    margin="normal"
                    name="address"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    type="text"
            size="small"
                    value={formik.values.address}
                /> */}

            {/* street: values.street,
          city: values.city,
          postal_code: values.postal_code,
          state: values.state, */}

            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h6">
                        Firm basic details
                    </Typography>
                    <Box sx={{ mt: 3 }}>
                        <Grid container
                            spacing={1} >
                            <Grid item
                                xs={12}
                                lg={6} >
                                <TextField
                                    required
                                    error={Boolean(formik.touched.street && formik.errors.street)}
                                    fullWidth
                                    helperText={formik.touched.street && formik.errors.street}
                                    label="Street"
                                    margin="normal"
                                    name="street"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.street}
                                />
                            </Grid>
                            <Grid item
                                xs={12}
                                lg={6} >
                                <TextField
                                    required
                                    error={Boolean(formik.touched.city && formik.errors.city)}
                                    fullWidth
                                    helperText={formik.touched.city && formik.errors.city}
                                    label="Town"
                                    margin="normal"
                                    name="city"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.city}
                                />
                            </Grid>
                            <Grid item
                                xs={12}
                                lg={6} >
                                <TextField
                                    required
                                    error={Boolean(formik.touched.postal_code && formik.errors.postal_code)}
                                    fullWidth
                                    helperText={formik.touched.postal_code && formik.errors.postal_code}
                                    label="Postcode"
                                    margin="normal"
                                    name="postal_code"
                                    onBlur={formik.handleBlur}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={formik.values.postal_code}
                                />
                            </Grid>
                            <Grid item
                                xs={12}
                                lg={6}
                                sx={{ width: "100%" }} >

                                {/* {lawyerDetails && lawyerDetails.state} */}
                                <FormControl sx={{ width: '100%', marginTop: 2 }}>
                                    <InputLabel
                                        required
                                        id="demo-simple-select-label"
                                    >State</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="state"
                                        value={formik.values.state}
                                        label="state"
                                        name="state"
                                        fullWidth
                                        onChange={formik.handleChange}
                                        error={Boolean(formik.touched.state && formik.errors.state)}
                                        // helperText={formik.touched.state && formik.errors.state}
                                        onBlur={formik.handleBlur}
                                    >
                                        {/* TODO should we use long or short? */}
                                        {ausStates.map(s => <MenuItem key={s.short}
                                            value={s.long}>{s.short}</MenuItem>)}
                                    </Select>
                                </FormControl>

                            </Grid>


                        </Grid>

                        <TextField
                            error={Boolean(formik.touched.jurisdiction && formik.errors.jurisdiction)}
                            fullWidth
                            helperText={formik.touched.jurisdiction && formik.errors.jurisdiction}
                            label="Jurisdiction (e.g. Nationwide, Statewide, Local)"
                            margin="normal"
                            name="jurisdiction"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            type="text"
                            value={formik.values.jurisdiction}
                        />
                    </Box></CardContent></Card>



            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h6">
                        Firm Social Accounts
                    </Typography>
                    <Box sx={{ mt: 3 }}>

                        <Grid container
                            spacing={2} >



                            {["facebook", "instagram", "linkedin", "twitter"].map(social =>

                                <Grid item
                                    key={social}
                                    xs={12}
                                    lg={6} >
                                    <table style={{ width: "100%" }}>
                                        <tbody>
                                            <tr>
                                                <td style={{ width: "40px" }}>
                                                    <Image height={20}
                                                        width={20}
                                                        src={`/icons/${social}.svg`} />
                                                </td>
                                                <td>
                                                    <TextField
                                                        error={Boolean(formik.touched[social] && formik.errors[social])}
                                                        fullWidth
                                                        helperText={formik.touched[social] && formik.errors[social]}
                                                        label={social + " url"}
                                                        margin="normal"
                                                        name={social}
                                                        onBlur={formik.handleBlur}
                                                        onChange={formik.handleChange}
                                                        type="text"
                                                        value={formik.values[social]}
                                                    />
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Grid>
                            )}
                        </Grid>
                    </Box></CardContent></Card>

            {/* </Grid>

            </Grid>

            <Grid
              item
              xs={12}
              lg={4}

            > */}

            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography
                        color="textSecondary"
                        variant="overline"
                    >
                        Company Logo
                    </Typography>

                    {/* {JSON.stringify(logoValue)} */}

                    {/* <Button onClick={() => uploadCompanyLogo()}>
                        UPLOAD test
                    </Button> */}

                    <Grid container
                        spacing={1} >

                        <Grid item
                            xs={12}
                            md={6}
                            lg={6} >

                            <Box sx={{ mt: 3 }}>
                                <FileDropzone
                                    accept={["image/jpeg", "image/png", "image/jpg"]}
                                    maxFiles={1}
                                    onDrop={handleDropCover}
                                />
                            </Box>
                        </Grid>

                        <Grid item
                            xs={12}
                            lg={6} >
                            {logoValue ? (
                                <Box
                                    sx={{
                                        backgroundImage: `url(${logoData ||
                                            (logoValue.includes("s44-p-k-no-ns-nd/photo.jpg") ? logoValue.split("s44-p-k-no-ns-nd/photo.jpg").join("") : logoValue)
                                            })`,
                                        backgroundPosition: 'center',
                                        backgroundSize: 'contain',
                                        backgroundRepeat: 'no-repeat',
                                        borderRadius: 1,
                                        height: 230,
                                        mt: 3
                                    }}
                                />
                            ) : (
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        border: 1,
                                        borderRadius: 1,
                                        borderStyle: 'dashed',
                                        borderColor: 'divider',
                                        height: 230,
                                        mt: 3,
                                        p: 3
                                    }}
                                >
                                    <Typography
                                        align="center"
                                        color="textSecondary"
                                        variant="h6"
                                    >
                                        Select a profile picture for this firm
                                    </Typography>
                                    <Typography
                                        align="center"
                                        color="textSecondary"
                                        sx={{ mt: 1 }}
                                        variant="subtitle1"
                                    >
                                        Image used for this firm&apos;s profile
                                    </Typography>
                                </Box>
                            )}
                            <Button
                                onClick={handleRemove}
                                sx={{ mt: 3 }}
                                disabled={!logoValue}
                            >
                                Remove photo
                            </Button>
                        </Grid>

                    </Grid>


                </CardContent>
            </Card>

            {/* <Box sx={{
                '& .MuiSvgIcon-root': {
                  color: "#FF5403"
                },
                '& .MuiTypography-root': {
                  color: "#01023B"
                }


              }}>
                <DropzoneArea
                  acceptedFiles={['image/*']}
                  dropzoneText={"Drag and drop an image here or click"}
                  onChange={logoChange}
                  filesLimit={1}
                />
              </Box> */}
            <br />

            {/* {lawyerDetails && JSON.stringify(lawyerDetails.working_hours)} */}

            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h6">
                        Office Hours
                    </Typography>
                    <Box sx={{ mt: 3 }}>

                        <Grid container
                            spacing={1} >

                            {(["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]).map(day => (
                                <Grid item
                                    xs={12}
                                    lg={6}
                                    key={day} >
                                    <Stack spacing={2}

                                        sx={{ width: "100%" }}>
                                        <Autocomplete
                                            id={'working_hours.' + day}
                                            key={day + "auto"}
                                            name={'working_hours.' + day}
                                            freeSolo
                                            options={["9am-5pm", "8am-4pm", "9am-12pm", "Closed", "24hrs"]}
                                            getOptionLabel={(option) => option}
                                            value={formik.values.working_hours[day]}
                                            fullWidth
                                            onChange={(event, value) => {
                                                formik.setFieldValue('working_hours.' + day, value);
                                            }}
                                            sx={{ width: "100%" }}
                                            renderInput={(params) => <TextField
                                                {...params}
                                                error={Boolean(
                                                    getIn(formik.touched, 'working_hours.' + day) &&
                                                    getIn(formik.errors, 'working_hours.' + day)
                                                    // formik.touched.working_hours[day] && formik.errors.working_hours[day]
                                                )}
                                                helperText={
                                                    getIn(formik.touched, 'working_hours.' + day) &&
                                                    getIn(formik.errors, 'working_hours.' + day)
                                                    // formik.touched.working_hours[day] && formik.errors.working_hours[day]
                                                }
                                                required
                                                sx={{ width: "100%" }}
                                                label={day}
                                                fullWidth
                                                margin="normal"
                                                type="text"
                                                value={formik.values.working_hours[day]}
                                                onBlur={formik.handleBlur}
                                                onChange={formik.handleChange}
                                            />}
                                        />
                                    </Stack>
                                </Grid>
                            ))}
                        </Grid>
                    </Box></CardContent></Card>
            {/* </Grid> */}

            {/* </Grid> */}

            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h6">
                        Services
                    </Typography>

                    {formik.values.premiumServices.map((service, index) => <div key={index}>
                        <TextField
                            // error={Boolean(formik.touched.jurisdiction && formik.errors.jurisdiction)}
                            fullWidth
                            // helperText={"todo"}
                            label="Service Title (e.g. Separation, Divorce, etc.)"
                            margin="normal"
                            name={`premiumServices.${index}.title`}
                            // onBlur={formik.handleBlur}
                            // onChange={formik.handleChange}
                            type="text"
                            value={service.title}
                            // onChange={(event) => handleServiceTitleChange(event, index)}
                            onChange={formik.handleChange}
                        />
                        <QuillEditor
                            name={`premiumServices.${index}.content`}
                            onChange={(value) => handleServiceContentChange(value, index)}
                            // onChange={formik.handleChange}
                            value={service.content}
                            placeholder="A more detailed overview of your firm (aim for 500-1000 characters)"
                            sx={{
                                height: 200,
                                mt: 3
                            }}
                        />
                        {index > 0 && <Button
                            onClick={() => handleRemoveService(index)}
                        >
                            Remove Service
                        </Button>}
                        <Divider sx={{ borderBottomWidth: 2, borderColor: "#eee", width: "100%", marginTop: "30px", marginBottom: "10px" }} />

                    </div>)}



                    <Button
                        onClick={handleAddService}
                    >
                        Add Service
                    </Button>


                </CardContent>
            </Card>

            <Card sx={{ mt: 4 }}>
                <CardContent>
                    <Typography variant="h6"
                        sx={{ paddingBottom: 0, marginBottom: 0 }}>
                        Summarised Overview
                    </Typography>
                    <Typography variant="body2"
                        align="right"
                        sx={{ padding: 0, margin: 0 }}>character count (<span style={{ color: briefOverviewText.length > 1000 ? "red" : "black" }}>{briefOverviewText.length}</span>/1000)</Typography>
                    <QuillEditor
                        name="description"
                        value={formik.values.description}
                        onChange={briefOverviewChange}
                        placeholder="A brief overview of your firm (aim for max 1000 characters)"
                        sx={{
                            height: 200,
                            mt: 3,

                            border: formik.errors.description && formik.touched.description ? "2px solid red" : ""
                        }}
                    />
                    {formik.errors.description && formik.touched.description && (
                        <Box sx={{ mt: 3 }}>
                            <FormHelperText error>
                                {formik.errors.description}
                            </FormHelperText>
                        </Box>
                    )}
                </CardContent>
            </Card>

            <Card sx={{
                mt: 4,
                backgroundColor: !isPremium ? "#F5F5F5" : "#FFF"
            }}>

                {!isPremium && goPremium()}

                <CardContent>

                    <Typography variant="h6"
                        sx={{
                            color: !isPremium ? "#AAA" : "#000"
                        }}
                    >
                        Detailed Overview
                    </Typography>


                    {/* {detailedOverview} */}
                    {/* {JSON.stringify(user)} */}
                    <QuillEditor
                        readOnly={!isPremium}
                        name="premiumOverview"
                        value={formik.values.premiumOverview}
                        onChange={detailedOverviewChange}
                        placeholder="A more detailed overview of your firm"
                        sx={{
                            height: 200,
                            mt: 3
                        }}
                    />
                </CardContent>
            </Card>





            <Card sx={{
                mt: 4,
                backgroundColor: !isPremium ? "#F5F5F5" : "#FFF"
            }}>
                {!isPremium && goPremium()}

                <CardContent>
                    <Typography variant="h6"
                        sx={{
                            color: !isPremium ? "#AAA" : "#000"
                        }}>
                        People
                    </Typography>

                    {formik.values.premiumPeople.map((person, index) => <div key={index}>
                        <Grid container
                            spacing={1} >



                            <Grid item
                                xs={12}
                                lg={6}>

                                <TextField
                                    disabled={!isPremium}
                                    // error={Boolean(formik.touched.jurisdiction && formik.errors.jurisdiction)}
                                    fullWidth
                                    // helperText={"todo"}
                                    label="Name"
                                    margin="normal"
                                    name={`premiumPeople.${index}.name`}
                                    // onBlur={formik.handleBlur}
                                    // onChange={(event) => handlePersonNameChange(event, index)}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={person.name}
                                />
                            </Grid>
                            <Grid item
                                xs={12}
                                lg={6}>
                                <TextField
                                    disabled={!isPremium}
                                    // error={Boolean(formik.touched.jurisdiction && formik.errors.jurisdiction)}
                                    fullWidth
                                    // helperText={"todo"}
                                    label="Role"
                                    margin="normal"
                                    name={`premiumPeople.${index}.title`}
                                    // onBlur={formik.handleBlur}
                                    // onChange={(event) => handlePersonTitleChange(event, index)}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={person.title}
                                />
                            </Grid>
                            <Grid item
                                xs={12}
                                lg={6} >
                                <TextField
                                    disabled={!isPremium}
                                    // error={Boolean(formik.touched.jurisdiction && formik.errors.jurisdiction)}
                                    fullWidth
                                    // helperText={"todo"}
                                    label="Specialty"
                                    margin="normal"
                                    name={`premiumPeople.${index}.specialty`}
                                    // onBlur={formik.handleBlur}
                                    // onChange={(event) => handlePersonSpecialtyChange(event, index)}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={person.specialty}
                                />
                            </Grid>
                            <Grid item
                                xs={12}
                                lg={6} >
                                <TextField
                                    disabled={!isPremium}
                                    // error={Boolean(formik.touched.jurisdiction && formik.errors.jurisdiction)}
                                    fullWidth
                                    // helperText={"todo"}
                                    label="Location"
                                    margin="normal"
                                    name={`premiumPeople.${index}.location`}
                                    // onBlur={formik.handleBlur}
                                    // onChange={(event) => handlePersonLocationChange(event, index)}
                                    onChange={formik.handleChange}
                                    type="text"
                                    value={person.location}
                                />
                            </Grid></Grid>

                        <TextField
                            disabled={!isPremium}
                            // error={Boolean(formik.touched.jurisdiction && formik.errors.jurisdiction)}
                            fullWidth
                            // helperText={"todo"}
                            label="Languages Spoken"
                            margin="normal"
                            name={`premiumPeople.${index}.languages`}
                            // onBlur={formik.handleBlur}
                            // onChange={(event) => handlePersonLanguagesChange(event, index)}
                            onChange={formik.handleChange}
                            type="text"
                            value={person.languages}
                        />

                        <TextField
                            disabled={!isPremium}
                            // error={Boolean(formik.touched.jurisdiction && formik.errors.jurisdiction)}
                            fullWidth
                            // helperText={"todo"}
                            label="Overview"
                            multiline
                            margin="normal"
                            name={`premiumPeople.${index}.spiel`}
                            // onBlur={formik.handleBlur}
                            // onChange={(event) => handlePersonSpielChange(event, index)}
                            onChange={formik.handleChange}
                            type="text"
                            value={person.spiel}
                        />



                        <Typography
                            color="textSecondary"
                            variant="overline"
                        >
                            Profile picture
                        </Typography>

                        <Grid container
                            spacing={1} >

                            <Grid item
                                xs={12}
                                md={6}
                                lg={6} >

                                <Box sx={{ mt: 3 }}>
                                    <FileDropzone
                                        disabled={!isPremium}
                                        accept={["image/jpeg", "image/png", "image/jpg"]}
                                        maxFiles={1}
                                        onDrop={([file]) => handlePersonLogoDrop([file], index)}
                                    />
                                </Box>
                            </Grid>

                            {/* {JSON.stringify(peopleLogoDataSet[index].file.type)} */}
                            {/* {getFileExtensionFromType(peopleLogoDataSet[index].file.type)} */}

                            <Grid item
                                xs={12}
                                lg={6} >
                                {peopleLogoDataSet[index] || person.image ? (
                                    <Box
                                        sx={{
                                            backgroundImage: `url(${peopleLogoDataSet[index] ? peopleLogoDataSet[index].data : person.image})`,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            borderRadius: 1,
                                            height: 230,
                                            mt: 3
                                        }}
                                    />
                                ) :
                                    (
                                        <Box
                                            sx={{
                                                alignItems: 'center',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'center',
                                                border: 1,
                                                borderRadius: 1,
                                                borderStyle: 'dashed',
                                                borderColor: 'divider',
                                                height: 230,
                                                mt: 3,
                                                p: 3
                                            }}
                                        >
                                            <Typography
                                                align="center"
                                                color="textSecondary"
                                                variant="h6"
                                            >
                                                Select a profile picture for this person
                                            </Typography>
                                            <Typography
                                                align="center"
                                                color="textSecondary"
                                                sx={{ mt: 1 }}
                                                variant="subtitle1"
                                            >
                                                Image used for this person&apos;s profile
                                            </Typography>
                                        </Box>
                                    )


                                }
                                <Button
                                    onClick={(e) => handlePersonLogoRemove(e, index)}
                                    sx={{ mt: 3 }}
                                    disabled={!peopleLogoDataSet[index]}
                                >
                                    Remove photo
                                </Button>
                            </Grid>

                        </Grid>

                        {index > 0 && <Button
                            onClick={() => handleRemovePerson(index)}
                        >
                            Remove Person
                        </Button>}
                        <Divider sx={{ borderBottomWidth: 2, borderColor: "#eee", width: "100%", marginTop: "30px", marginBottom: "10px" }} />

                    </div>)}

                    <Button
                        onClick={handleAddPerson}
                        disabled={!isPremium}
                        sx={{
                            color: isPremium ? "blue" : "text.disabled",
                        }}
                    >
                        Add Person
                    </Button>


                </CardContent>
            </Card>

            <Card sx={{
                mt: 4,
                backgroundColor: !isPremium ? "#F5F5F5" : "#FFF"
            }}>
                {!isPremium && goPremium()}
                <CardContent>
                    <Typography variant="h6"
                        sx={{
                            color: !isPremium ? "#AAA" : "#000"
                        }}>
                        Accreditations &#38; awards
                    </Typography>


                    {formik.values.premiumAccreditations.map((accreditation, index) => <div key={index}>
                        <TextField
                            // error={Boolean(formik.touched.jurisdiction && formik.errors.jurisdiction)}
                            fullWidth
                            // helperText={"todo"}
                            label="Name"
                            margin="normal"
                            name={`premiumAccreditations.${index}.name`}
                            // onBlur={formik.handleBlur}
                            // onChange={(event) => handleAccreditationNameChange(event, index)}
                            onChange={formik.handleChange}
                            type="text"
                            value={accreditation.name}
                        />
                        <TextField
                            // error={Boolean(formik.touched.jurisdiction && formik.errors.jurisdiction)}
                            fullWidth
                            // helperText={"todo"}
                            label="Year"
                            margin="normal"
                            name={`premiumAccreditations.${index}.year`}
                            // onBlur={formik.handleBlur}
                            // onChange={(event) => handleAccreditationYearChange(event, index)}
                            onChange={formik.handleChange}
                            type="text"
                            value={accreditation.year}
                        />


                        <Grid container
                            spacing={1} >

                            <Grid item
                                xs={12}
                                md={6}
                                lg={6} >

                                <Box sx={{ mt: 3 }}>
                                    <FileDropzone
                                        accept={["image/jpeg", "image/png", "image/jpg"]}
                                        maxFiles={1}
                                        onDrop={([file]) => handleAccreditationLogoDrop([file], index)}
                                    />
                                </Box>
                            </Grid>

                            <Grid item
                                xs={12}
                                lg={6} >
                                {accreditationLogoDataSet[index] || accreditation.image ? (
                                    <Box
                                        sx={{
                                            backgroundImage: `url(${accreditationLogoDataSet[index] ? accreditationLogoDataSet[index].data : accreditation.image})`,
                                            backgroundPosition: 'center',
                                            backgroundSize: 'cover',
                                            borderRadius: 1,
                                            height: 230,
                                            mt: 3
                                        }}
                                    />
                                ) : (
                                    <Box
                                        sx={{
                                            alignItems: 'center',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            justifyContent: 'center',
                                            border: 1,
                                            borderRadius: 1,
                                            borderStyle: 'dashed',
                                            borderColor: 'divider',
                                            height: 230,
                                            mt: 3,
                                            p: 3
                                        }}
                                    >
                                        <Typography
                                            align="center"
                                            color="textSecondary"
                                            variant="h6"
                                        >
                                            Select a profile picture for this person
                                        </Typography>
                                        <Typography
                                            align="center"
                                            color="textSecondary"
                                            sx={{ mt: 1 }}
                                            variant="subtitle1"
                                        >
                                            Image used for this person&apos;s profile
                                        </Typography>
                                    </Box>
                                )}
                                <Button
                                    onClick={(e) => handleAccreditationLogoRemove(e, index)}
                                    sx={{ mt: 3 }}
                                    disabled={!accreditationLogoDataSet[index]}
                                >
                                    Remove photo
                                </Button>
                            </Grid>

                        </Grid>

                        {index > 0 && <Button
                            sx={{ color: "blue" }}
                            onClick={() => handleRemoveAccreditation(index)}
                        >
                            Remove Accreditation
                        </Button>}
                        <Divider sx={{ borderBottomWidth: 2, borderColor: "#eee", width: "100%", marginTop: "30px", marginBottom: "10px" }} />

                    </div>)}

                    <Button
                        onClick={handleAddAccreditation}
                        disabled={!isPremium}
                        sx={{
                            color: isPremium ? "blue" : "text.disabled",
                        }}
                    >
                        Add Accreditation
                    </Button>


                </CardContent>
            </Card>

            <Card sx={{
                mt: 4,
                backgroundColor: !isPremium ? "#F5F5F5" : "#FFF"
            }}>
                {!isPremium && goPremium()}
                <CardContent>
                    <Typography variant="h6"
                        sx={{
                            color: !isPremium ? "#AAA" : "#000"
                        }}>
                        Fee guide
                    </Typography>

                    {formik.values.premiumFees.map((fee, index) => <div key={index}>
                        <TextField
                            // error={Boolean(formik.touched.jurisdiction && formik.errors.jurisdiction)}
                            fullWidth
                            // helperText={"todo"}
                            label="Fee type"
                            margin="normal"
                            name={`premiumFees.${index}.title`}
                            // onBlur={formik.handleBlur}
                            // onChange={(event) => handleFeeTitleChange(event, index)}
                            onChange={formik.handleChange}
                            type="text"
                            value={fee.title}
                        />
                        <TextField
                            // error={Boolean(formik.touched.jurisdiction && formik.errors.jurisdiction)}
                            fullWidth
                            // helperText={"todo"}
                            label="Price"
                            margin="normal"
                            name={`premiumFees.${index}.price`}
                            // onBlur={formik.handleBlur}
                            // onChange={(event) => handleFeePriceChange(event, index)}
                            onChange={formik.handleChange}
                            type="text"
                            value={fee.price}
                        />

                        {index > 0 && <Button
                            onClick={() => handleRemoveFee(index)}
                        >
                            Remove Fee
                        </Button>}
                        <Divider sx={{ borderBottomWidth: 2, borderColor: "#eee", width: "100%", marginTop: "30px", marginBottom: "10px" }} />

                    </div>)}
                    <Button
                        onClick={handleAddFee}
                        disabled={!isPremium}
                        sx={{
                            color: isPremium ? "blue" : "text.disabled",
                        }}
                    >
                        Add Fee
                    </Button>


                </CardContent>
            </Card>


            <Card sx={{
                mt: 4,
                backgroundColor: !isPremium ? "#F5F5F5" : "#FFF"
            }}>
                {!isPremium && goPremium()}
                <CardContent>
                    <Typography variant="h6"
                        sx={{
                            color: !isPremium ? "#AAA" : "#000"
                        }}>
                        Features
                    </Typography>
                    <br /><br />
                    <Switch checked={featureBookOnlineChecked} onChange={checkFeatureBookOnline} align="right" />Book Online
                    <br /><br />
                    <Switch checked={featureFixedFeesChecked} onChange={checkFeatureFixedFees} align="right" />Fixed fees
                    <br /><br />
                    <Switch checked={featureFreeFirstAppointmentChecked} onChange={checkFeatureFreeFirstAppointment} align="right" />Free first appoinment
                    <br /><br />
                    <Switch checked={featureNoWinNoFeeChecked} onChange={checkFeatureNoWinNoFee} align="right" />No win, no fee

                </CardContent>
            </Card>


            <Card sx={{
                mt: 4,
                backgroundColor: !isPremium ? "#F5F5F5" : "#FFF"
            }}>
                {!isPremium && goPremium()}
                <CardContent>
                    <Typography variant="h6"
                        sx={{
                            color: !isPremium ? "#AAA" : "#000"
                        }}>
                        Frequently asked questions
                    </Typography>

                    {formik.values.premiumFaqs.map((faq, index) => <div key={index}>

                        <TextField
                            // error={Boolean(formik.touched.jurisdiction && formik.errors.jurisdiction)}
                            fullWidth
                            // helperText={"todo"}
                            label="Question"
                            margin="normal"
                            name={`premiumFaqs.${index}.question`}
                            // onBlur={formik.handleBlur}
                            // onChange={(event) => handleFaqQuestionChange(event, index)}
                            onChange={formik.handleChange}
                            type="text"
                            value={faq.question}
                        />
                        <TextField
                            // error={Boolean(formik.touched.jurisdiction && formik.errors.jurisdiction)}
                            fullWidth
                            // helperText={"todo"}
                            multiline
                            label="Answer"
                            margin="normal"
                            name={`premiumFaqs.${index}.answer`}
                            // onBlur={formik.handleBlur}
                            // onChange={(event) => handleFaqAnswerChange(event, index)}
                            onChange={formik.handleChange}
                            type="text"
                            value={faq.answer}
                        />

                        {index > 0 && <Button
                            onClick={() => handleRemoveFaq(index)}
                        >
                            Remove Fee
                        </Button>}
                        <Divider sx={{ borderBottomWidth: 2, borderColor: "#eee", width: "100%", marginTop: "30px", marginBottom: "10px" }} />

                    </div>)}
                    <Button
                        onClick={handleAddFaq}
                        disabled={!isPremium}
                        sx={{
                            color: isPremium ? "blue" : "text.disabled",
                        }}
                    >
                        Add FAQ
                    </Button>


                </CardContent>
            </Card>

            {/* <Typography
            color="textSecondary"
            variant="overline"
          >
            About your Firm
          </Typography>

          <TextField
            error={Boolean(formik.touched.description && formik.errors.description)}
            fullWidth
            multiline
            helperText={formik.touched.description && formik.errors.description}
            label="Brief Overview (max 500 characters)"
            margin="normal"
            name="description"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            size="small"
            value={formik.values.description}
          />

          <TextField
            error={Boolean(formik.touched.premiumOverview && formik.errors.premiumOverview)}
            fullWidth
            multiline
            helperText={formik.touched.premiumOverview && formik.errors.premiumOverview}
            label="Detailed Overview (max 1000 characters)"
            margin="normal"
            name="premiumOverview"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type="text"
            size="small"
            value={formik.values.premiumOverview}
          /> */}


            {/* {Boolean(formik.touched.policy && formik.errors.policy) && (
                <FormHelperText error>
                    {formik.errors.policy}
                </FormHelperText>
            )} */}

            <Box sx={{
                mt: 2,
                width: "100%",
                '& .MuiFormHelperText-root': { textAlign: "center" },
                position: '-webkit-sticky',
                position: 'sticky',
                bottom: 0,
                zIndex: 5,
                width: '100%',
                backgroundColor: "#f0f0f0",
                padding: "20px"
            }}
                align="center">
                <Button
                    disabled={formik.isSubmitting}
                    size="large"
                    type="submit"
                    variant="contained"
                    color="secondary"
                >
                    {lawyerDetails ? "SAVE CHANGES" : "CREATE LISTING"}
                </Button>

                {/* {JSON.stringify(formik.errors)} */}

                {/* {JSON.stringify(lawyerDetails)} */}

                {/* {JSON.stringify(formik.values)} */}

                {formik.errors && !_.isEmpty(formik.errors) && (
                    <Box sx={{ mt: 3 }}>
                        <FormHelperText error>
                            Please check field errors
                        </FormHelperText>
                    </Box>
                )}

                {formik.errors.submit && (
                    <Box sx={{ mt: 3 }}>
                        <FormHelperText error>
                            {formik.errors.submit}
                        </FormHelperText>
                    </Box>
                )}
            </Box>
        </form>
    </Box>
    )

}