import UpdateSettingForm from './UpdateSettingForm';

export default function UpdateSettingModule({
  config,
  children,
  withUpload = false,
  uploadSettingKey = null,
}) {
  return (
    <UpdateSettingForm config={config} withUpload={withUpload} uploadSettingKey={uploadSettingKey}>
      {children}
    </UpdateSettingForm>
  );
}
