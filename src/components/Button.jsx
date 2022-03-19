import styled from "styled-components";
import { lighten, darken } from "polished";
import { css } from "styled-components";

const colorStyles = css`
  /* (props) => const selected = props.theme.palette[props.color];  */
  /* 위의 코드를 비구조화 할당 문법을 사용하여 아래 코드로 리팩토링 */
  ${({ theme, color }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
      &:hover {
        background: ${lighten(0.1, selected)};
      }
      &:active {
        background: ${darken(0.1, selected)};
      }
      ${(props) =>
        props.outline &&
        css`
          color: ${selected};
          background: none;
          border: 1px ${selected} solid;
          &:hover {
            background: ${selected};
            color: white;
          }
        `}
    `;
  }}
`;

// sizeStyles 중복 코드를 리팩토링
const sizes = {
  large: { height: "3rem", fontSize: "1.25rem" },
  medium: { height: "2.25rem", fontSize: "1rem" },
  small: { height: "1.75rem", fontSize: "0.875rem" },
};

const sizeStyles = css`
  ${({ size }) => css`
    height: ${sizes[size].height};
    font-size: ${sizes[size].fontSize};
  `}
`;

const fullWidthStyles = css`
  ${(props) =>
    props.fullWidth &&
    css`
      width: 100%;
      justify-content: center;
      &:not(:first-child) {
        margin-top: 1rem;
        margin-left: 0;
      }
    `}
`;

const StyledButton = styled.button`
  /* 공통 스타일 */
  outline: none;
  border: none;
  border-radius: 4px;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding-left: 1rem;
  padding-right: 1rem;

  /* 코드를 분리하여 관리하면 유지 및 보수하기에 편함 */
  /* 크기 */
  ${sizeStyles}

  /* 색상 */
  ${colorStyles}

  /* 기타 */
  /* StyledButton 컴포넌트를 사용하는 여러 버튼들 사이의 스타일을 지정 */
  /* & + & {} 명령어를 이용하는 것이지만, 현재 오류로 인해 적용이 되지 않음 */
  &:not(:first-child) {
    margin-left: 1rem;
  }

  ${fullWidthStyles}
`;

// 함수의 파라미터가 몇개가 될 지 모르는 상황에서 rest 파라미터를 사용
const Button = ({ children, fullWidth, outline, size, color, ...rest }) => {
  return (
    <StyledButton fullWidth={fullWidth} outline={outline} color={color} size={size} {...rest}>
      {children}
    </StyledButton>
  );
};

Button.defaultProps = {
  color: "blue",
  size: "medium",
};

export default Button;
