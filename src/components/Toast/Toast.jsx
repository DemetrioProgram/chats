import './Toast.css';

export default function Toast(props) {
  return (
      <>
        {props.showToast && <div style={{ backgroundColor: props.color }} className="toast">
            {props.msg}
        </div>}
      </>
  );
}