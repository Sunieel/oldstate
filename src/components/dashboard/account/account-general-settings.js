import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Divider,
  Grid,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { UserCircle as UserCircleIcon } from '../../../icons/user-circle';

import { useAuth } from '../../../hooks/use-auth';
import { Auth } from 'aws-amplify';

import toast from 'react-hot-toast';

import { useState  } from 'react';

import { AccountNotificationsSettings } from './account-notifications-settings';
import { AccountSecuritySettings } from './account-security-settings';
import { AccountSubscriptionSettings } from './account-subscription-settings';

export const AccountGeneralSettings = (props) => {
  // To get the user from the authContext, you can use
  const { user } = useAuth();
  // const user = {
  //   avatar: '/avstatic/mock-images/avatars/avatar-anika_visser.png',
  //   name: 'Anika Visser'
  // };
  const [saving, setSaving] = useState(false);

  const [firstname, setFirstname] = useState(user.firstname);
  const [surname, setSurname] = useState(user.surname);
  const [firm, setFirm] = useState(user.firm);
  const [phone, setPhone] = useState(user.phone);


  const handleDetailChange = (event, param) => {
    // this.setState({value: event.target.value});
    // toast.success(`${event.target.value}`, {  duration: 10000 });
    switch (param) {
      case 'firstname':
        setFirstname(event.target.value);
        break;
      case 'surname':
        setSurname(event.target.value);
        break;
      case 'firm':
        setFirm(event.target.value);
        break;
      case 'phone':
        setPhone(event.target.value);
        break;
      default:
        break;
    }
  };

  const saveAttribute = async (attribute) => {
    setSaving(true);
    try {
      let user = await Auth.currentAuthenticatedUser();
      switch (attribute) {
        case 'firstname':
          await Auth.updateUserAttributes(user, {
            'custom:firstname': firstname,
          });
          break;
        case 'surname':
          await Auth.updateUserAttributes(user, {
            'custom:surname': surname,
          });
          break;
        case 'firm':
          await Auth.updateUserAttributes(user, {
            'custom:firm': firm,
          });
          break;
        case 'phone':
          await Auth.updateUserAttributes(user, {
            'custom:phone': phone,
          });
          break;
        default:
          break;
      }
      toast.success("Changes saved!");
    } catch (error) {
      toast.error(JSON.stringify(error));
    } finally {
      setSaving(false);
    }
  }



  return (
    <Box
      sx={{ mt: 4 }}
      {...props}>
      <Card>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Basic details
              </Typography>
            </Grid>

            {/* {JSON.stringify(user)} */}


            <Grid
              item
              md={12}
              xs={12}
            >
              {/* bring in avatar later */}
              {/* <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex'
                }}
              >
                <Avatar
                  src={user.avatar}
                  sx={{
                    height: 64,
                    mr: 2,
                    width: 64
                  }}
                >
                  <UserCircleIcon fontSize="small" />
                </Avatar>
                <Button>
                  Change
                </Button>
              </Box> */}
              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center'
                }}
              >
                <TextField
                  defaultValue={user.firstname}
                  onChange={(event) => handleDetailChange(event, 'firstname')}
                  label="First Name"
                  size="small"
                  required
                  sx={{
                    flexGrow: 1,
                    mr: 3
                  }}
                />
                <Button disabled={saving}
onClick={() => saveAttribute("firstname")}>
                  Save
                </Button>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center'
                }}
              >
                <TextField
                  defaultValue={user.surname}
                  label="Surname"
                  onChange={(event) => handleDetailChange(event, 'surname')}
                  size="small"
                  required
                  sx={{
                    flexGrow: 1,
                    mr: 3
                  }}
                />
                <Button disabled={saving}
onClick={() => saveAttribute("surname")}>
                  Save
                </Button>
              </Box>


              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center'
                }}
              >
                <TextField
                  defaultValue={user.phone}
                  label="Phone"
                  onChange={(event) => handleDetailChange(event, 'phone')}
                  size="small"
                  required
                  sx={{
                    flexGrow: 1,
                    mr: 3
                  }}
                />
                <Button disabled={saving}
onClick={() => saveAttribute("phone")}>
                  Save
                </Button>
              </Box>


              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center'
                }}
              >
                <TextField
                  defaultValue={user.firm}
                  label="Firm"
                  onChange={(event) => handleDetailChange(event, 'firm')}
                  size="small"
                  required
                  sx={{
                    flexGrow: 1,
                    mr: 3
                  }}
                />
                <Button disabled={saving}
onClick={() => saveAttribute("firm")}>
                  Save
                </Button>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  mt: 3,
                  alignItems: 'center'
                }}
              >
                {/* <Typography label="Email"
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3
                  }}>
                {user.email}
                </Typography> */}
                <TextField
                  defaultValue={user.email}
                  disabled
                  label="Email Address"
                  required
                  size="small"
                  sx={{
                    flexGrow: 1,
                    mr: 3,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderStyle: 'dashed'
                    }
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      {/* <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Public profile
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              sm={12}
              xs={12}
            >
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mb: 3
                }}
              >
                <div>
                  <Typography variant="subtitle1">
                    Make Contact Info Public
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    Means that anyone viewing your profile will be able to see your contacts
                    details.
                  </Typography>
                </div>
                <Switch />
              </Box>
              <Divider />
              <Box
                sx={{
                  alignItems: 'center',
                  display: 'flex',
                  justifyContent: 'space-between',
                  mt: 3
                }}
              >
                <div>
                  <Typography variant="subtitle1">
                    Available to hire
                  </Typography>
                  <Typography
                    color="textSecondary"
                    sx={{ mt: 1 }}
                    variant="body2"
                  >
                    Toggling this will let your teammates know that you are available for
                    acquiring new projects.
                  </Typography>
                </div>
                <Switch defaultChecked />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card> */}


      <br />
      <AccountSubscriptionSettings />
      <br />
      <AccountNotificationsSettings />

      <br />

      <AccountSecuritySettings />

      <Card sx={{ mt: 4 }}>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={4}
              xs={12}
            >
              <Typography variant="h6">
                Delete Account
              </Typography>
            </Grid>
            <Grid
              item
              md={8}
              xs={12}
            >
              <Typography
                sx={{ mb: 3 }}
                variant="subtitle1"
              >
                Delete your account and all of your source data. This is irreversible.
              </Typography>

              {/* TODO need to implement */}
              <Button
                color="error"
                variant="outlined"
                onClick={() => toast.error("Please contact admin to delete your account")}
              >
                Delete account
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};
