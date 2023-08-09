import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Input } from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import { useForm } from 'react-hook-form';
import { createCabin } from '../../services/apiCabins';
import { toast } from 'react-hot-toast';
import FormRow from '../../ui/FormRow';

function CreateCabinForm() {
  const { register, handleSubmit, reset, getValues, formState } = useForm();

  const { errors } = formState;

  const queryClient = useQueryClient();

  const { isLoading: isCreating, mutate } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success('Cabin successfully created');

      queryClient.invalidateQueries({
        queryKey: ['cabins'],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    mutate({ ...data, image: data.image[0] });
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
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
          disabled={isCreating}
          defaultValue={0}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) =>
              value * 4 <= getValues().regularPrice ||
              'Discount should be less than 25% of the regular price.',
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
          disabled={isCreating}
          {...register('description', { required: 'This field is required' })}
        />
      </FormRow>

      <FormRow label='Cabin photo' error={errors?.image?.message || null}>
        <FileInput
          id='image'
          accept='image/*'
          {...register('image', { required: 'This field is required' })}
          type='file'
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation='secondary' type='reset'>
          Cancel
        </Button>
        <Button disabled={isCreating}>Add cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
