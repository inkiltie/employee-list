// Only executed on server
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Employees } from '../imports/collections/employees';
import { image, helpers } from 'faker';

Meteor.startup(() => {
  // Great place to generate data

  // Check to see if data exists in the collection
  // See of the collection has any records
  const numberRecords = Employees.find({}).count();
  console.log(numberRecords);

  if(!numberRecords) {
    // Generate some data...
    _.times(5000, () => {
      const { name, email, phone } = helpers.createCard();
      // const name = helpers.createCard().name;
      // const email = helpers.createCard().email;
      // const phone = helpers.createCard().phone;

      Employees.insert({
        // name: name,
        // email: email,
        // phone: phone
        name, email, phone,
        avatar: image.avatar()
      });
    });
  }

  Meteor.publish('employees', (per_page) => {
    return Employees.find({}, { limit: per_page });
  });
});
