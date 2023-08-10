/* eslint-disable react/prop-types */
import { Input } from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';

import { useForm } from 'react-hook-form';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';

function CreateCabinForm({ cabinToEdit = {}, onShowForm }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { createCabin, isCreating } = useCreateCabin(onShowForm);
  const { editCabin, isEditing } = useEditCabin(onShowForm);

  const { errors } = formState;

  const isWorking = isCreating || isEditing;

  function onSubmit(data) {
    const image = typeof data.image === 'string' ? data.image : data.image[0];

    const onSuccessOptions = {
      onSuccess: () => {
        reset();
        onShowForm(false);
      },
    };

    isEditSession
      ? editCabin(
          { newCabinData: { ...data, image }, id: editId },
          onSuccessOptions
        )
      : createCabin({ ...data, image }, onSuccessOptions);
  }

  // function onError(errors) {
  //   // console.log(errors);
  // }

  return (
    <Form onSubmit={handleSubmit(onSubmit /* , onError*/)}>
      <FormRow label='Cabine Name' error={errors?.name?.message || null}>
        <Input
          type='text'
          id='name'
          disabled={isWorking}
          {...register('name', {
            required: 'This field is required',
          })}
        />
      </FormRow>
      <FormRow
        label='Maximum capacity'
        error={errors?.maxCapacity?.message || null}
      >
        <Input
          type='number'
          id='maxCapacity'
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>
      <FormRow
        label='Regular price'
        error={errors?.regularPrice?.message || null}
      >
        <Input
          type='number'
          id='regularPrice'
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: {
              value: 1,
              message: 'Capacity should be at least 1',
            },
          })}
        />
      </FormRow>
      <FormRow label='Discount' error={errors?.discount?.message || null}>
        <Input
          type='number'
          id='discount'
          disabled={isWorking}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value * 4 <= getValues().regularPrice ||
              "Discount couldn't be more than 25% of the regular price.",
          })}
        />
      </FormRow>
      <FormRow
        label='Description for website'
        error={errors?.description?.message || null}
      >
        <Textarea
          type='text'
          id='description'
          defaultValue=''
          disabled={isWorking}
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message || null}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', {
            required: isEditSession ? false : 'This field is required',
          })}
          type='file'
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isWorking}>
          {isEditSession ? 'Edit Cabin' : 'Create new cabin'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
